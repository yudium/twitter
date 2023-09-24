import { tweetRepo } from "src/index";
import { CreateTweetUseCase } from "src/useCases/CreateTweet";
import { isString } from "../RequestValidator/isString";
import { RequestHandler } from "./RequestHandler";

interface RequestBody {
  tweet: string;
}

export class CreateTweetRequestHandler extends RequestHandler<RequestBody> {
  getValidationScheme() {
    return {
      tweet: [isString({ isRequired: true })],
    };
  }

  async getResponse() {
    const id = await new CreateTweetUseCase(tweetRepo).execute(
      this.getBody("tweet")
    );

    return { id };
  }
}
