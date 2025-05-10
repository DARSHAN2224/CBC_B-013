import mongoose from 'mongoose';
import { User } from './userModel.js';

// Create patient schema with a single array of objects
const patientSchema = new mongoose.Schema({
    patientDetails: [{
        symptoms: { type: String },
        diseaseName: { type: String },
        doctorToConsult: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
        bookingDate: {
            type: Date,
            validate: {
                validator: function(v) {
                    return v >= Date.now();  // Ensures the booking date is not in the past
                },
                message: 'Booking date cannot be in the past!'
            }
        },
    }],
});

// Middleware to delete records if bookingDate is past
patientSchema.pre('save', function(next) {
    // Loop through patientDetails array to check for bookingDate
    this.patientDetails.forEach(detail => {
        if (detail.bookingDate && detail.bookingDate < Date.now()) {
            detail.bookingDate = undefined;  // Clear the bookingDate if it's in the past
        }
    });
    next();
});

// Create the 'Patient' model using the User model as a base
export const Patient = User.discriminator('Patient', patientSchema);
