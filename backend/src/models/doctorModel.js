import mongoose from 'mongoose';
import { User } from './userModel.js';

const doctorSchema = new mongoose.Schema({
    speciality: { type: String, required: true },
});

export const Doctor = User.discriminator('Doctor', doctorSchema);
