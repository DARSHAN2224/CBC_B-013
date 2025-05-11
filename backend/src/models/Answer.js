// models/answerModel.js
import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  answers: {
    type: Map,
    of: String, // Modify type if you need numbers, booleans, or objects
  },
  timestamp: { type: Date, default: Date.now },
});

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
