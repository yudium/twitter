import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { CreateTweetRequestHandler } from "./RequestHandlers/CreateTweetRequestHandler";
import { TweetRepo } from "./repositories/tweetRepo";
const app = express();
const port = 5055;

app.use(bodyParser.json());

const FRONTEND_HOST = "127.0.0.1:5173";

export const tweetRepo = new TweetRepo();

app.use(
  cors({
    origin: ["http://" + FRONTEND_HOST, "http://" + FRONTEND_HOST],
  })
);

let tweets = [];

app.get("/status", (req, res) => {
  res.send(200);
});

app.post("/tweet", async (req, res) => {
  await new CreateTweetRequestHandler(req, res).execute();
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
