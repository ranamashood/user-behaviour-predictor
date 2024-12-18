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

    setPrediction("");

    const { appUsage, screenTime, batteryDrain, appsCount, dataUsage } =
      formData;

    const data = [appUsage, screenTime, batteryDrain, appsCount, dataUsage];

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/dataset/predict`,
      { data },
    );

    setPrediction(response.data.prediction);
  };

  const getRandomData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/dataset/random`,
    );

    setFormData(response.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="App Usage Time (min/day)"
          name="appUsage"
          value={formData.appUsage}
          onChange={handleFieldChange}
        />
        <TextField
          label="Screen On Time (hours/day)"
          name="screenTime"
          value={formData.screenTime}
          onChange={handleFieldChange}
        />
        <TextField
          label="Battery Drain (mAh/day)"
          name="batteryDrain"
          value={formData.batteryDrain}
          onChange={handleFieldChange}
        />
        <TextField
          label="Number of Apps Installed"
          name="appsCount"
          value={formData.appsCount}
          onChange={handleFieldChange}
        />
        <TextField
          label="Data Usage (MB/day)"
          name="dataUsage"
          value={formData.dataUsage}
          onChange={handleFieldChange}
        />

        <Button title="Random row from dataset" onClick={getRandomData} />
        <Button title="Predict" type="submit" />
      </form>

      <div>{prediction}</div>
    </>
  );
}

export default App;
