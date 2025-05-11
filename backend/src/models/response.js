import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  userId: String,
  answers: Object,
  createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);

export default Response;
