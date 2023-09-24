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
    expect(typeof response.body.data.id).toBe("string");
    expect(response.body.data.id.length).toBeGreaterThan(1);
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
