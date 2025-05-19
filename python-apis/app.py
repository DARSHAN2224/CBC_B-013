from flask import Flask, request, jsonify
from model import predict_proba
from gemini_client import generate_gemini_response
import json
import os

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_and_generate():
    try:
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        predictions = predict_proba(input_data)

        prediction_text = ', '.join([f"{k}: {v}%" for k, v in predictions.items()])
        prompt = (
            f"A mental health prediction model returned the following likelihoods for a user:\n"
            f"{prediction_text}.\n"
            f"Ask one question related to this personal habits such as yoga, music, hulerious videos and travel so that i can use it for recommendation"
            f"Based on this, generate 10 personalized and relevant follow-up questions "
            f"to better understand the user's mental health condition."
        )

        questions_text = generate_gemini_response(prompt)
        questions = questions_text.strip().split('\n')
        filtered_questions = [q.strip("-•1234567890. ").strip() for q in questions if q.strip()]

        return jsonify({
            "predictions": predictions,
            "questions": filtered_questions[:10]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate_suggestions', methods=['POST'])
def generate_suggestions():
    try:
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        print("Received input data:", input_data)

        # Assuming the data format is like { '1': 'Some text', '2': 'More text' }
        if not isinstance(input_data, dict):
            return jsonify({"error": "Invalid input data format, expected dictionary"}), 400

        prompt = (
            "You are a mental health assistant AI. Based on the following user data, "
            "analyze their condition and provide personalized mental health suggestions that are practical and empathetic. "
            "Consider both emotional and behavioral patterns in your suggestions.\n\n"
            f"User Data: {json.dumps(input_data, indent=2)}\n\n"
            "Give 3-5 suggestions tailored to their input. Be concise, helpful, and human-like."
        )

        suggestions = generate_gemini_response( prompt)

        if not suggestions:
            return jsonify({"error": "Failed to generate suggestions"}), 500

        return jsonify({
            "suggestions": suggestions if isinstance(suggestions, list) else [str(suggestions)]
        })

    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
def load_videos_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        videos = file.readlines()
    return [video.strip() for video in videos if video.strip()]

# Build the prompt for Gemini
def build_prompt(user_data, video_list):
    interests = user_data.get("interests", [])
    watch_history = user_data.get("watch_history", [])
    prompt = f"""
    The user has the following interests: {interests}
    and has previously watched: {watch_history}.
    From the list of available videos below, suggest the 5 most relevant:

    {video_list}
    """
    return prompt

@app.route('/recommend_personal_habits', methods=['POST'])
def recommend_videos():
    try:
        user_data = request.json  # Expecting JSON from Node.js backend
        video_list = load_videos_from_txt("user_habits.txt")
        prompt = build_prompt(user_data, video_list)
        recommendations = generate_gemini_response(prompt)
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run(port=5000)
