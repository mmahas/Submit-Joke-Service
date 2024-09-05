import { Inject, Service } from "typedi";
import { IJoke, IJokeInputDto } from '../interfaces/IJoke';
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

@Service()
export default class JokeService {
  constructor(
    @Inject("jokeModel") private jokeModel,
  ) { }

  // Create a new joke
  public async createJoke(jokeDTO: IJokeInputDto): Promise<{ jokeId: string }> {
    const joke = await this.jokeModel.create({ ...jokeDTO });

    if (!joke) {
      throw new Error("Joke cannot be created");
    }

    return { jokeId: joke._id.toString() };
  }

  // Get jokes with pagination
  public async getNextJoke(): Promise<{ joke: IJoke | null; totalJokes: number }> {
    const totalJokes = await this.jokeModel.countDocuments({ status: 'submitted' }); // Assuming there's a status field to track joke status
    const joke = await this.jokeModel.findOne({ status: 'submitted' })
      .sort({ createdAt: 'desc' });

    return { joke, totalJokes };
  }

  // Update a joke by ID
  public async updateJoke(query: FilterQuery<IJoke>, update: UpdateQuery<IJokeInputDto>, options: QueryOptions): Promise<IJoke | null> {
    const updatedJoke = await this.jokeModel.findOneAndUpdate(query, update, options);

    if (!updatedJoke) {
      throw new Error("Joke cannot be updated");
    }

    return updatedJoke;
  }

  // Delete a joke by ID
  public async deleteJoke(_id: string): Promise<void> {
    const result = await this.jokeModel.deleteOne({ _id });

    if (result.deletedCount === 0) {
      throw new Error("Joke not found");
    }
  }
}
