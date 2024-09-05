import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }: { expressApp: any }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const jokeModel = {
    name: "jokeModel",
    model: require("../models/JokeModels").default,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      jokeModel
    ],
  });

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
