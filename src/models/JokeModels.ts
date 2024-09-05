import mongoose from "mongoose";
import { IJokeInputDto } from "../interfaces/IJoke";
import Status from "./enums/status-type";

const Joke = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: 'submitted'
    },
  },
  { timestamps: true }
);

Joke.index({ content: 1, type: 1 }, { unique: true });

export default mongoose.model<IJokeInputDto & mongoose.Document>(
  "IJoke",
  Joke,
  "jokes"
);
