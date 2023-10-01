import { tweetRepo } from "src/index";
import { CreateTweetUseCase } from "src/useCases/CreateTweet/CreateTweet";
import { Controller } from "../../RequestHandlers/Controller";
import { isString } from "../../RequestValidator/isString";

export class CreateTweetController extends Controller {
  getValidationScheme() {
    return {
      tweet: [isString({ isRequired: true })],
    };
  }

  async handle() {
    const id = await new CreateTweetUseCase(tweetRepo).execute(
      this.req.getBody("tweet")
    );

    return { id };
  }
}
