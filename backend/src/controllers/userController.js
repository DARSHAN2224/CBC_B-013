import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from '../models/userModel.js'
// import { Doctor } from '../models/doctorModel.js'
import { ApiError } from '../utils/ApiError.js'
import Answer from "../models/Answer.js"
import uploadOnCloudinary from '../utils/cloudinary.js'
import ContactUs from "../models/contactus.js"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import { sendVerificationEmail, contactUS,sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } from "../utils/emails.js"
import { randomBytes } from "node:crypto"
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import axios from "axios";
// import { Patient } from '../models/patientModel.js'
const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        return accessToken;
    }
    catch (error) {
        throw new ApiError("Error in generating access token", 500, "Something went wrong while generating the access token");
    }
};

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token with the deviceId
        user.refreshTokens=refreshToken;
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            "Error in generating tokens",
            500,
            "Something went wrong in generating refresh and access token"
        );
    }
};

export const registerUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ApiError("Error while sign up", 400, errors.array())
    }

    const { name, email, password, mobile} = req.body

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new ApiError("Error while registering the user", 400, "Email already exists",)
    }
    const verificationToken = generateVerificationCode();

    let user;
    
      user = new User({
        email,
        password,
        name,
        mobile,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

    await user.save();

    sendVerificationEmail(user.name, user.email, verificationToken)

    res.status(200).json(new ApiResponse(200,
        {
            ...user._doc,
            password: undefined,
            refreshTokens: undefined,

        }, "User registered Successfully. Verify the email first"))
})

export const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() }
    })

    if (!user) {
        throw new ApiError("Error while verifying the email", 400, "Invalid or expired verification code")
    }
    user.is_verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined
    await user.save();
    await sendWelcomeEmail(user.name, user.email);
    return res.status(200).json(
        new ApiResponse(200, {}, "Verify Email Successfully")
    )

})

export const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError("Error while login", 400, errors.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError("Error while login", 400, "Email and password are not correct");
    }

    const correctPassword = await user.isPasswordCorrect(password);
    if (!correctPassword) {
        throw new ApiError("Error while login", 400, "Password and email do not exist");
    }
    // if (!user.is_verified) {
    //     throw new ApiError("Error while login", 400, "email not verified");
    // }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    ...user._doc,
                    password: undefined,
                    refreshTokens: undefined,
                },

                "User Logged In Successfully"
            )
        );
});

export const logoutUser = asyncHandler(async (req, res) => {

    await User.findById(req.user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.query?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(incomingRefreshToken, req.cookies);

    const { deviceId } = req.body;

    if (!incomingRefreshToken || !deviceId) {
        throw new ApiError("Unauthorized request", 401, "Invalid token or device ID");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError("Unauthorized request", 401, "Invalid refresh token");
        }

        const tokenMatch = user.refreshTokens.find((t) => t.token === incomingRefreshToken && t.deviceId === deviceId);
        if (!tokenMatch) {
            throw new ApiError("Unauthorized request", 401, "Token does not match any device");
        }

        const accessToken = await generateAccessToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res.status(200).cookie("accessToken", accessToken, options).json(new ApiResponse(200, { accessToken }, "Refresh Access Token Successfully"));
    } catch (error) {
        throw new ApiError("Unauthorized request", 401, "Invalid refresh token");
    }
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
            throw new ApiError("Error while forget password", 400, errors.array())
        }
    }
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError("error in forgot password", 400, "Invalid email")
    }
    //Generate reset token
    const resetToken = randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;// 1 hours in milliseconds
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    //send email
    await sendResetPasswordEmail(user.name, email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    return res.status(200).json(new ApiResponse(200, {}, "Reset token successfully sent to user email address"))
})

export const resetPassword = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
            throw new ApiError("Error while reset password", 400, errors.array())
        }
    }
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (confirmPassword != password) {
        throw new ApiError("error in reset password", 400, "confirm password does not match")
    }
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })
    if (!user) {
        throw new ApiError("error in reset password", 400, "Invalid or expired reset token")

    };
    if (user.password === password || user.password === confirmPassword) {
        throw new ApiError("error in reset password", 400, "entered old password pls enter new one")
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    sendResetSuccessEmail(user.name, user.email);
    return res.status(200).json(new ApiResponse(200, {}, "User password successfully reset"));
})

export const updateEditProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ApiError("Validation error while updating profile", 400, errors.array());
    }

    const { name, email, mobile,speciality} = req.body; // Extract user data
    console.log(name,email,mobile,speciality,"kkkk");
    
    const userId = req.user._id; // Get user ID from session
    const user = await User.findById(userId); // Fetch user from the database

    if (!user) {
        throw new ApiError("User not found", 404, "User not found");
    }

    let image;
    console.log(req.file);
    // Default to existing image
    if (req.file) {
        const localImagePath = req.file.path; // Uploaded image file path
        image = await uploadOnCloudinary(localImagePath); // Upload to cloud
        user.image = image?.url || '';

        // Optionally: Delete the local file if not needed anymore
        // fs.unlinkSync(localImagePath);
    }

    // Update fields
    user.name = name;
    user.email = email;
    user.mobile = mobile;

    await user.save(); // Save updates to database
    res.status(200).json(new ApiResponse(200, {
        ...user._doc,
        password: undefined,
        refreshTokens: undefined,
    }, "User updated successfully"));
});

export const loadHome = async (req, res) => {
    const user = req.user;
    // res.render('home',{offers,shops,user});
    res.status(200).json(new ApiResponse(200, {
        user: {
            ...user._doc,
            password: undefined,
            refreshTokens: undefined,
        }
    }, ""))
}

export const sendverification = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
            throw new ApiError("Error while forget password", 400, errors.array())
        }
    }
    const { email } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
        throw new ApiError("Error while verifying the email", 400, "Please enter valid  email",)
    }
    const verificationToken = generateVerificationCode();
  
    userData.verificationToken=verificationToken
    userData.verificationTokenExpiresAt= Date.now() + 24 * 60 * 60 * 1000,

  
    await userData.save();

    sendVerificationEmail(userData.name, userData.email, verificationToken)

    res.status(200).json(new ApiResponse(200,
        {verificationToken}, "check your mail to verify"))

});

export const checkAuth=asyncHandler( async (req, res)=>{
        const user=await User.findById(req.user._id).select("-password")
        if (!user){
            throw new ApiError("Error while chech auth", 400,"User not found")
        }
        res.status(200).json(new ApiResponse(200,
            {user}, "check your mail to verify"))
    
})

export const contactUs=asyncHandler(async (req,res) => {
    const {email,message}=req.body;
    const user=new ContactUs({
         email,
         message,
    });
    await user.save()
    await contactUS(message,email);
    res.status(200).json(new ApiResponse(200,
        {}, "emailed successfully"))

})

export const predictHandler = asyncHandler(async (req, res) => {
    console.log("hhhh");
    
    const response = await axios.post('http://localhost:5000/predict', req.body);

    if (!response || !response.data) {
        throw new ApiError("Error during prediction", 500, "No data received from prediction service");
    }

    return res.status(200).json(
        new ApiResponse(200, response.data, "Prediction successful")
    );
});


// Route to store answers in MongoDB
export const storeAnswers = asyncHandler(async (req, res) => {
    const { user_id, answers } = req.body;

    const newAnswer = new Answer({ user_id, answers });
    await newAnswer.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Answers saved successfully")
    );
});

// Route to generate suggestions based on stored answers


export const generateSuggestions = asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        throw new ApiError("user_id is required", 400,"hhh");
    }

    const answerDoc = await Answer.findOne({ user_id }, { answers: 1 });

    if (!answerDoc || !answerDoc.answers) {
        throw new ApiError("Answers not found", 404,"kjkjk");
    }

    const answersObject = Object.fromEntries(answerDoc.answers);

    const response = await axios.post('http://localhost:5000/generate_suggestions', answersObject);

    return res.status(200).json(
        new ApiResponse(200, { suggestions: response.data.suggestions }, "Suggestions generated successfully")
    );
});


export const recommendPersonalHabits = asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        throw new ApiError("user_id is required", 400,"vhhja");
    }

    const answerDoc = await Answer.findOne({ user_id }, { answers: 1 });

    if (!answerDoc || !answerDoc.answers) {
        throw new ApiError("Answers not found", 404,"hggjgj");
    }

    const answersObject = Object.fromEntries(answerDoc.answers);

    const response = await axios.post('http://localhost:5000/generate_suggestions', answersObject);

    return res.status(200).json(
        new ApiResponse(200, { suggestion: response.data.suggestion }, "Personal habit recommendation generated")
    );
});