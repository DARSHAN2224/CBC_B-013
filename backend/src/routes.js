const express = require('express');
const Answer = require('./models/Answer');
const axios = require('axios');
const router = express.Router();

// Route to predict and generate questions
router.post('/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).send('Error during prediction');
    }
});

// Route to store answers in MongoDB
router.post('/store_answers', async (req, res) => {
    const { user_id, answers } = req.body;

    try {
        const newAnswer = new Answer({ user_id, answers });
        await newAnswer.save();
        res.json({ status: 'success', message: 'Answers saved' });
    } catch (error) {
        console.error('Error saving answers:', error);
        res.status(500).send('Error saving answers');
    }
});

// Route to generate suggestions based on stored answers
const mongoose = require('mongoose');

router.post('/generate_suggestions', async (req, res) => {
    const { user_id } = req.body;

    try {
        // Optional: Validate user_id format if needed
        if (!user_id) {
            return res.status(400).json({ status: 'error', message: 'user_id is required' });
        }

        // Fetch only the 'answers' field
        const answerDoc = await Answer.findOne({ user_id }, { answers: 1 });

        if (!answerDoc || !answerDoc.answers) {
            return res.status(404).json({ status: 'error', message: 'Answers not found' });
        }

        const answersObject = Object.fromEntries(answerDoc.answers);

        // Send answers to Flask API
        const response = await axios.post('http://localhost:5000/generate_suggestions', answersObject);

        // Send only suggestions back to frontend
        res.json({ suggestions: response.data.suggestions });
    } catch (error) {
        console.error('Error generating suggestions:', error.message);
        res.status(500).send('Error generating suggestions');
    }
});

router.post('/recommend_personal_habits', async (req, res) => {
  try {
    const { user_id } = req.body;
    // console.log(user_id);
    
    if (!user_id) {
      return res.status(400).json({ status: 'error', message: 'user_id is required' });
    }

        const answerDoc = await Answer.findOne({ user_id }, { answers: 1 });
        // console.log(answerDoc);

    if (!answerDoc || !answerDoc.answers) {
      return res.status(404).json({ status: 'error', message: 'Answers not found' });
    }

        const answersObject = Object.fromEntries(answerDoc.answers);
        // console.log(answersObject);

        const response = await axios.post('http://localhost:5000/generate_suggestions', answersObject);
            console.log(answersObject+"ojiajsia");

    res.json({suggestion:response.data.suggestion});
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);  // More detailed logging
    res.status(500).json({ error: 'Failed to fetch recommendations from Python service', details: error.message });
  }
});



module.exports = router;
