import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.impute import SimpleImputer

# Sample dataset
data = {
    'mood': [2, 3, 1, 4, 5],
    'sleep_hours': [4, 6, 3, 7, 8],
    'appetite_loss': [1, 0, 1, 0, 0],
    'fatigue': [1, 0, 1, 0, 1],
    'motivation': [2, 3, 1, 4, 5],
    'anxiety_level': [5, 4, 3, 2, 1],
    'stress': [1, 0, 1, 0, 0],
    'depression': [1, 0, 1, 0, 0],
    'anxiety': [1, 0, 1, 0, 0],
    'burnout': [1, 0, 1, 0, 0],
    'insomnia': [1, 0, 1, 0, 0]
}
df = pd.DataFrame(data)

# Features and targets
X = df.drop(['stress', 'depression', 'anxiety', 'burnout', 'insomnia'], axis=1)
y = df[['stress', 'depression', 'anxiety', 'burnout', 'insomnia']]

# Imputer and model
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)
model = MultiOutputClassifier(RandomForestClassifier())
model.fit(X_imputed, y)

def predict_proba(input_dict):
    features = list(X.columns)
    input_data = [input_dict.get(feat, np.nan) for feat in features]
    input_array = imputer.transform([input_data])
    probas = model.predict_proba(input_array)
    results = {label: round(probas[idx][0][1] * 100, 2) for idx, label in enumerate(y.columns)}
    return results
