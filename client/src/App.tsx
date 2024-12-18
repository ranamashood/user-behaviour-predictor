import { useState } from "react";
import Button from "./components/Button";
import TextField from "./components/TextField";
import { IFormData } from "./models";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState<IFormData>({} as IFormData);
  const [prediction, setPrediction] = useState<string>("");

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { appUsage, screenTime, batteryDrain, appsCount, dataUsage } =
      formData;

    const data = [appUsage, screenTime, batteryDrain, appsCount, dataUsage];

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/dataset/predict`,
      { data },
    );

    setPrediction(response.data.prediction);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="App Usage Time (min/day)"
          name="appUsage"
          onChange={handleFieldChange}
        />
        <TextField
          label="Screen On Time (hours/day)"
          name="screenTime"
          onChange={handleFieldChange}
        />
        <TextField
          label="Battery Drain (mAh/day)"
          name="batteryDrain"
          onChange={handleFieldChange}
        />
        <TextField
          label="Number of Apps Installed"
          name="appsCount"
          onChange={handleFieldChange}
        />
        <TextField
          label="Data Usage (MB/day)"
          name="dataUsage"
          onChange={handleFieldChange}
        />

        <Button title="Predict" />
      </form>

      <div>{prediction}</div>
    </>
  );
}

export default App;
