const request = require("supertest");

const HOST = "localhost:5055";

afterEach(async () => {
  const response = await sendDelete("/tweets");
  expect(response.status).toBe(200);
});

describe("When tweet is valid", () => {
  const payload = {
    tweet: "This is a tweet",
  };

  it("creates tweet", async () => {
    const response = await sendPost("/tweet", payload);

    expect(response.status).toBe(200);
    expect(typeof response.body.id).toBe("string");

    const tweets = await sendGet("/tweets");
    expect(tweets.body.tweets.length).toBe(1);
    expect(tweets.body.tweets[0].tweet).toBe(payload.tweet);
  });
});

describe("When tweet is empty or missing", () => {
  const payload = {
    tweet: "",
  };

  it("returns 400 response and do not create empty tweet", async () => {
    const response = await request(HOST).post("/tweet").send(payload);
    expectResponse(response, 400, {
      message: "Invalid tweet",
      data: {
        tweet: ["Tweet is required"],
      },
    });

    const tweets = await request(HOST).get(`/tweets`);
    expectResponse(tweets, 200, {
      tweets: [],
    });
  });
});

async function sendPost(endpoint, payload) {
  return await request(HOST).post(endpoint).send(payload);
}

async function sendGet(endpoint) {
  return await request(HOST).get(endpoint);
}

async function sendDelete(endpoint, payload) {
  return await request(HOST).delete(endpoint).send(payload);
}

function expectResponse(response, code, body) {
  expect(response.status).toBe(code);
  expect(response.body).toEqual(body);
}
