import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { ExpressRequest } from "./RequestHandlers/ExpressRequest";
import { ExpressResponse } from "./RequestHandlers/ExpressResponse";
import { TweetRepo } from "./repositories/tweetRepo";
import { CreateTweetController } from "./useCases/CreateTweet/CreateTweetController";

/**
 * Instantiate the repositories to be used by the app
 */
export const tweetRepo = new TweetRepo();

/**
 * Routes
 */
const app = express();
const port = 5055;

app.use(bodyParser.json());

const FRONTEND_HOST = "127.0.0.1:5173";
app.use(
  cors({
    origin: ["http://" + FRONTEND_HOST, "http://" + FRONTEND_HOST],
  })
);

let tweets = [];

app.get("/status", (req, res) => {
  res.send(200);
});

app.post("/tweet", async (req, res): Promise<void> => {
  await new CreateTweetController(
    new ExpressRequest(req),
    new ExpressResponse(res)
  ).execute();
});

app.get("/tweets", (req, res) => {
  res.status(200).json({ tweets });
});

app.delete("/tweets", (req, res) => {
  tweets = [];
  res.status(200).json({ message: "Tweets deleted" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
