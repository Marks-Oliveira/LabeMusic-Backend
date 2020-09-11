import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);

export default app;