const request = require("supertest");

afterEach(async () => {
  const response = await sendDelete("/tweets");
  expect(response.status).toBe(200);
});

describe("When tweet is valid", () => {
  const payload = {
    tweet: "This is a tweet",
  };

  it("returns 200 response", async () => {
    const response = await sendPost("/tweet", payload);
    expect(response.status).toBe(200);
    expect(typeof response.body.id).toBe("string");
  });

  it("creates tweet", async () => {
    await sendPost("/tweet", payload);
    const response = await sendGet("/tweets");
    expect(response.body.tweets.length).toBe(1);
    expect(response.body.tweets[0].tweet).toBe(payload.tweet);
  });
});

describe("When tweet is empty or missing", () => {
  const payload = {
    tweet: "",
  };

  it("returns 400 response", async () => {
    let response = await request("localhost:5055").post("/tweet").send(payload);
    expectResponse(response, 400, {
      message: "Invalid tweet",
      data: {
        tweet: ["Tweet is required"],
      },
    });
  });

  it("does not create empty tweet", async () => {
    let response = await request("localhost:5055").post("/tweet").send(payload);
    response = await request("localhost:5055").get(`/tweets`);
    expectResponse(response, 200, {
      tweets: [],
    });
  });
});

async function sendPost(endpoint, payload) {
  return await request("localhost:5055").post(endpoint).send(payload);
}

async function sendGet(endpoint) {
  return await request("localhost:5055").get(endpoint);
}

async function sendDelete(endpoint, payload) {
  return await request("localhost:5055").delete(endpoint).send(payload);
}

function expectResponse(response, code, body) {
  expect(response.status).toBe(code);
  expect(response.body).toEqual(body);
}
