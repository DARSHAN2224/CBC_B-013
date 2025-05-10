import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError("Unauthorized request", 401, "Invalid token");
        }
        // console.log(decodedToken+"ppkokj");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decodedToken+"ll");
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshTokens");

        if (!user) {
            throw new ApiError("Unauthorized request", 401, "Invalid token");
        }
        // console.log(user+"kk");

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        
        throw new ApiError("Unauthorized request", 401, error.message || "Invalid token");
    }
});

export const onlyPatientAccess = asyncHandler(async (req, res, next) => {

    if (req.user.role != 0) {
        throw new ApiError("Unauthorized request for seller", 400, "you have not permission to access this route!");
    }

    return next();
})