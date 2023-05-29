import express from "express";
const app = express();
const port = 5055;

app.get("/status", (req, res) => {
  res.send(200);
});

app.post("/tweet", (req, res) => {
  const tweet = "This is a tweet";
  res.json({ id: "1" });
});


app.get("/tweet/:id", (req, res) => {
  const tweet = "This is a tweet";
  res.json({ tweet });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
