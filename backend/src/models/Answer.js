// models/answerModel.js
import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User'  // Reference to the User model
  },
 answers: [String],
  timestamp: { type: Date, default: Date.now },
});

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
