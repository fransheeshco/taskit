import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import router from "./routes/tasks.js";
import userRouter from "./routes/users.js"
import mongoose from "mongoose";
dotenvConfig();

const app = express();

const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", router);
app.use("/api/user", userRouter);

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error");
  });
