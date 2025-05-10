from flask import Flask, request, jsonify
from predict import predict_mental_health
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin requests (useful for frontend integration)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'Missing input data'}), 400

        prediction = predict_mental_health(data)
        return jsonify(prediction)

    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
