# Request Handler

## Problem

previously we have code like this

```js
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
```

then we can see in future that there a lot of request handlers that has same pattern: if validation fail then returns 400 response otherwise returns 200 response. To avoid duplication to become expensive when changes need to be made in future or testing it again and again hence it is better to pull them into an abstraction.