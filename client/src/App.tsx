import { useState } from "react";
import Button from "./components/Button";
import TextField from "./components/TextField";
import { IFormData } from "./models";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import PredictionoMeter from "./components/PredictionoMeter";

function App() {
  const [formData, setFormData] = useState<IFormData>({} as IFormData);
  const [prediction, setPrediction] = useState<number>(0);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPrediction(0);
    setIsPredicting(true);

    const { appUsage, screenTime, batteryDrain, appsCount, dataUsage } =
      formData;

    const data = [appUsage, screenTime, batteryDrain, appsCount, dataUsage];

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/dataset/predict`,
      { data },
    );

    setPrediction(parseInt(response.data.prediction));
    setIsPredicting(false);
  };

  const getRandomData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/dataset/random`,
    );

    setFormData(response.data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Container>
          <PredictionoMeter
            prediction={prediction}
            isPredicting={isPredicting}
          />

          <Form onSubmit={handleSubmit}>
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
          </Form>
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
`;

const Container = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default App;
