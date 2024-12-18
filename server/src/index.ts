import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { spawn } from "child_process";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.post("/dataset/predict", (req: Request, res: Response) => {
  const { data } = req.body;

  const process = spawn(".venv/bin/python", ["model_prediction.py", data]);

  let response: string = "";
  let error: string = "";

  process.stdout.on("data", (data: Buffer) => {
    response += data.toString();
  });

  process.stderr.on("data", (data: Buffer) => {
    console.error(data.toString());
    error += data.toString();
  });

  process.on("close", (code) => {
    if (code === 0) {
      res.send({ prediction: parseInt(response) });
    } else {
      console.error(`Process exited with code ${code}`);
      res
        .status(500)
        .send({ error: { msg: "Model prediction gone wrong", desc: error } });
    }
  });

  process.on("error", (err) => {
    console.error(err);
    res.status(500).send({ error: { msg: "Process not started", desc: err } });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
