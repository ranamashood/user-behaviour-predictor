import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
