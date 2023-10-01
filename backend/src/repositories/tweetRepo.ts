import nanoid from "nanoid";

interface Tweet {
    id: string;
    tweet: string;
}

const tweets = [];

export class TweetRepo {
  async save(tweet: Omit<Tweet, 'id'>): Promise<string> {
    const id = nanoid();

    tweets.push({
      id,
      ...tweet,
    });

    return id;
  }
}
