import sys
import pickle
import numpy as np

model = pickle.load(open("../public/models/rf.pkl", "rb"))
scaler = pickle.load(open("../public/models/scaler.pkl", "rb"))

request_data = sys.argv[1]

data = np.array(request_data).reshape(1, -1)

scaled_data = scaler.transform(data)

predicted_label = model.predict(scaled_data)[0]

print(predicted_label)
