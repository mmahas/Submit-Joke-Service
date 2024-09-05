import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import logger from "../../loaders/logger";
import { IJokeInputDto } from "../../interfaces/IJoke";
import { jokeValidationPost, jokeValidationPatch } from "../../validators/joke";
import JokeService from "../../services/JokeService";
import axios from "axios";
import config from "../../config";

const route = Router();

export default (app: Router) => {
  app.use("/submit", route);

  // Create a new joke
  route.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await jokeValidationPost.validateAsync(req.body as IJokeInputDto);
        const jokeService = Container.get(JokeService);
        const jokeId = await jokeService.createJoke(req.body as IJokeInputDto);

        logger.info(`📝 New joke created with ID: ${jokeId.jokeId}`);
        return res.status(201).json(jokeId);
      } catch (error) {
        logger.error(`❌ Failed to create joke: ${error.message}`, error);
        return res.status(400).json({ message: 'Failed to create joke', error: error.message });
      }
    }
  );

  // Get all jokes with pagination
  route.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const jokeService = Container.get(JokeService);
        const { joke, totalJokes } = await jokeService.getNextJoke();

        if (!joke) {
          return res.status(404).json({ message: 'No jokes available for moderation' });
        }

        logger.info(`📚 Retrieved joke with ID ${joke._id} for moderation`);
        return res.status(200).json({ joke, totalJokes });
      } catch (error) {
        logger.error(`❌ Failed to retrieve joke for moderation: ${error.message}`, error);
        return res.status(500).json({ message: 'Failed to retrieve joke for moderation', error: error.message });
      }
    }
  );

  // Get all Joke Types
  route.get(
    '/joke-type',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization; 
        const response = await axios.get(`${config.deliver_jokes_service_url}/joke-type`);
        logger.info("📥 Fetched joke type successfully");
        return res.status(200).json(response.data); 
      } catch (error) {
        logger.error("❌ Error fetching joke types: %o", error);
        return res.status(500).json({ message: 'Failed to fetch joke types', error: error.message });
      }
    }
  );

  // Update an existing joke
  route.patch(
    "/:_jokeId",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._jokeId;
      const updateData = req.body;
      try {
        await jokeValidationPatch.validateAsync(updateData as IJokeInputDto);
        const jokeService = Container.get(JokeService);
        const updatedJoke = await jokeService.updateJoke({ _id }, updateData as IJokeInputDto, { new: true });

        if (updatedJoke) {
          logger.info(`✅ Joke with ID ${_id} updated successfully`);
          return res.status(200).json(updatedJoke);
        } else {
          logger.warn(`⚠️ Joke with ID ${_id} not found for update`);
          return res.status(404).json({ message: 'Joke not found' });
        }
      } catch (error) {
        logger.error(`❌ Failed to update joke: ${error.message}`, error);
        return res.status(400).json({ message: 'Failed to update joke', error: error.message });
      }
    }
  );

  // Delete a joke
  route.delete(
    "/:_jokeId",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._jokeId;
      try {
        const jokeService = Container.get(JokeService);
        await jokeService.deleteJoke(_id);

        logger.info(`🗑️ Joke with ID ${_id} deleted successfully`);
        return res.status(200).json({ message: 'Joke deleted successfully' });
      } catch (error) {
        logger.error(`❌ Failed to delete joke: ${error.message}`, error);
        return res.status(500).json({ message: 'Failed to delete joke', error: error.message });
      }
    }
  );
};
