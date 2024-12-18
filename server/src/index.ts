import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { spawn } from "child_process";
import chalk from "chalk";
import fs from "fs";
import csv from "csv-parser";

const PORT = process.env.PORT || 5000;

const app = express();

const dataset: any = [];

fs.createReadStream("public/datasets/user_behavior_dataset_altered.csv")
  .pipe(csv({ headers: false }))
  .on("data", (data) => dataset.push(Object.values(data)));

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
    console.error(chalk.red(data.toString()));
    error += data.toString();
  });

  process.on("close", (code) => {
    if (code === 0) {
      res.status(200).send({ prediction: parseInt(response) });
    } else {
      console.error(chalk.red(`Process exited with code ${code}`));
      res
        .status(500)
        .send({ error: { msg: "Model prediction gone wrong", desc: error } });
    }
  });

  process.on("error", (err) => {
    console.error(chalk.red(err));
    res.status(500).send({ error: { msg: "Process not started", desc: err } });
  });
});

app.get("/dataset/random", (_req: Request, res: Response) => {
  const randomIndex = Math.floor(Math.random() * dataset.length);
  const row = dataset[randomIndex];

  const data = {
    appUsage: row[0],
    screenTime: row[1],
    batteryDrain: row[2],
    appsCount: row[3],
    dataUsage: row[4],
  };

  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
