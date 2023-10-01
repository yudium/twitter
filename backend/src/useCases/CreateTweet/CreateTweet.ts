import { TweetRepo } from "src/repositories/tweetRepo";

export class CreateTweetUseCase {
  constructor(private tweetRepo: TweetRepo) {}

  async execute(tweet: string): Promise<string> {
    const id = await this.tweetRepo.save({
      tweet: tweet,
    });

    return id;
  }
}
