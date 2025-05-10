import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        image: {
            type: String
        },
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: 8
        },
        refreshTokens: {
            type: String
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        role: {
            type: Number,
            enum: [0, 1],
            default: 0
        }, // 0 for Patient, 1 for Doctor
        lastLogin: { type: Date, default: Date.now },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const currentDate = new Date();

    if (this.resetPasswordExpiresAt && this.resetPasswordExpiresAt < currentDate) {
        this.resetPasswordToken = '';
        this.resetPasswordExpiresAt = null;
    }

    if (this.verificationTokenExpiresAt && this.verificationTokenExpiresAt < currentDate) {
        this.verificationToken = '';
        this.verificationTokenExpiresAt = null;
    }

    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    return token;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, mobile: this.mobile, name: this.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model("User", userSchema);
