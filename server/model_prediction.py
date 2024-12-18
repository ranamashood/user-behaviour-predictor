import sys
import pickle
import numpy as np
import ast

models_path = "./public/models"

model = pickle.load(open(f"{models_path}/rf.pkl", "rb"))
scaler = pickle.load(open(f"{models_path}/scaler.pkl", "rb"))

request_data = sys.argv[1]

request_data = ast.literal_eval(request_data)

data = np.array(request_data).reshape(1, -1)

scaled_data = scaler.transform(data)

predicted_label = model.predict(scaled_data)[0]

print(predicted_label)
