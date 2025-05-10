import joblib
import numpy as np

def predict_mental_health(data):
    predictions = {}

    try:
        # Depression
        if all(key in data for key in ['sleep_duration_hours', 'fatigue_level', 'mood_score']):
            model = joblib.load('models/depression_model.pkl')
            X = np.array([[data['sleep_duration_hours'], data['fatigue_level'], data['mood_score']]])
            predictions['depression'] = int(model.predict(X)[0])

        # Anxiety
        if all(key in data for key in ['restlessness_level', 'sleep_quality_score']):
            model = joblib.load('models/anxiety_model.pkl')
            X = np.array([[data['restlessness_level'], data['sleep_quality_score']]])
            predictions['anxiety'] = int(model.predict(X)[0])

        # Bipolar
        if all(key in data for key in ['mood_fluctuation_score', 'manic_energy_level']):
            model = joblib.load('models/bipolar_model.pkl')
            X = np.array([[data['mood_fluctuation_score'], data['manic_energy_level']]])
            predictions['bipolar'] = int(model.predict(X)[0])

        # Schizophrenia
        if all(key in data for key in ['hallucination_presence', 'speech_disorganization_score']):
            model = joblib.load('models/schizophrenia_model.pkl')
            X = np.array([[data['hallucination_presence'], data['speech_disorganization_score']]])
            predictions['schizophrenia'] = int(model.predict(X)[0])

        # PTSD
        if all(key in data for key in ['trauma_exposure', 'flashbacks_frequency']):
            model = joblib.load('models/ptsd_model.pkl')
            X = np.array([[data['trauma_exposure'], data['flashbacks_frequency']]])
            predictions['ptsd'] = int(model.predict(X)[0])

        if not predictions:
            return {'error': 'Insufficient data to predict any mental health condition'}

        return {'predictions': predictions}
    
    except Exception as e:
        return {'error': str(e)}
