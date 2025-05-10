import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
import joblib

# List of mental health diseases
diseases = ['depression', 'anxiety', 'bipolar', 'schizophrenia', 'ptsd']

# Default demo data for each disease
demo_data = {
    'depression': pd.DataFrame({
        'sleep_duration_hours': [4, 6, 8, 7, 5, 9],
        'fatigue_level': [9, 8, 3, 2, 7, 1],
        'mood_score': [2, 3, 7, 9, 4, 8],
        'depression': [1, 1, 0, 0, 1, 0]
    }),
    'anxiety': pd.DataFrame({
        'restlessness_level': [8, 7, 2, 1, 6, 3],
        'sleep_quality_score': [2, 3, 9, 8, 5, 7],
        'anxiety': [1, 1, 0, 0, 1, 0]
    }),
    'bipolar': pd.DataFrame({
        'mood_fluctuation_score': [9, 8, 3, 2, 7, 4],
        'manic_energy_level': [9, 8, 2, 1, 6, 3],
        'bipolar': [1, 1, 0, 0, 1, 0]
    }),
    'schizophrenia': pd.DataFrame({
        'hallucination_presence': [1, 1, 0, 0, 1, 0],
        'speech_disorganization_score': [9, 8, 3, 1, 7, 2],
        'schizophrenia': [1, 1, 0, 0, 1, 0]
    }),
    'ptsd': pd.DataFrame({
        'trauma_exposure': [1, 1, 0, 0, 1, 0],
        'flashbacks_frequency': [5, 6, 1, 0, 4, 2],
        'ptsd': [1, 1, 0, 0, 1, 0]
    }),
}



def train_models():
    os.makedirs('models', exist_ok=True)
    os.makedirs('datasets', exist_ok=True)

    for disease in diseases:
        path = f'datasets/{disease}.csv'
        
        if os.path.exists(path):
            df = pd.read_csv(path)
        else:
            df = demo_data[disease]

        X = df.drop(columns=[disease])
        y = df[disease]

        model = RandomForestClassifier()
        model.fit(X, y)
        joblib.dump(model, f'models/{disease}_model.pkl')
        print(f"✅ Trained model for {disease}")

if __name__ == "__main__":
    train_models()
    print("✅ All mental health models trained and saved.")
