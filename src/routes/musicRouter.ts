import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router();

const musicController = new MusicController();

musicRouter.post("/", musicController.createMusic);
musicRouter.get("/", musicController.getAllMusic);
musicRouter.get("/:id", musicController.getMusicById);


export default musicRouter;