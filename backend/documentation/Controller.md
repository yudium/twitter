# Controller

## Problem

Previously we have code like this

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

In future that there are going a lot of request handlers that has same pattern: if validation fail then returns 400 response otherwise returns 200 response. To avoid duplication becomes expensive and reduce unit test hence decided we are going to to group them in an abstraction, Controller class.