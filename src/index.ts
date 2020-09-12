import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/music", musicRouter);

export default app;