import { Router } from "express";
import JokeController from "./controller/JokeController";

export default () => {
  const app = Router();
  JokeController(app);
  return app;
};
