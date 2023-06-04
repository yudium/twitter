import express from "express";
import bodyParser from "body-parser";
import nanoid from "nanoid";
const app = express();
const port = 5055;

app.use(bodyParser.json());

let tweets = [];

app.get("/status", (req, res) => {
  res.send(200);
});

app.post("/tweet", (req, res) => {
  if (isStringEmpty(req.body.tweet)) {
    res.status(400).json({
      message: "Invalid tweet",
      data: {
        tweet: ["Tweet is required"],
      },
    });
    return;
  }

  const tweet = {
    id: nanoid(),
    tweet: req.body.tweet,
  };

  tweets.push(tweet);

  res.status(200).json({ id: tweet.id });
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

function isStringEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim() === "";
}
