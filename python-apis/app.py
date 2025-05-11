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
    
@app.route('/recommend_personal_habits', methods=['POST'])
def recommend_from_file():
    try:
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        file_path = os.path.join(os.path.dirname(__file__), 'user_habits.txt')
        print(f"File path: {file_path}")

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"{file_path} does not exist")

        try:
            with open(file_path, 'r') as f:
                user_data = json.load(f)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON format in user_habits.txt"}), 400

        print(f"Loaded user data: {user_data}")

        prompt = (
            f"User Data: {json.dumps(input_data, indent=2)}\n\n"
            "Recommend:\n"
            "- 5 Uplifting Music\n"
            "- 5 Comedy Videos\n"
            "- 5 Travel Destinations\n"
            "- 5 Yoga/Meditation Routines"
        )

        result = generate_gemini_response(prompt)

        if isinstance(result, str):
            result = json.loads(result)

        return jsonify(result)

    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        print(f"Error: {str(e)}")  # Log the detailed error to the console
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500




if __name__ == '__main__':
    app.run(port=5000)
