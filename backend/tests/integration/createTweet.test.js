const request = require("supertest");

describe("When /tweet/create called", () => {
  beforeAll(async () => {
    const DELAY = 400;
    let retries = 10;
    while (true && retries > 0) {
      try {
        let response = await request("localhost:5055").get("/status");
        if (response.status === 200) {
          return;
        }
      } catch (e) {}
      await delay(DELAY);
      retries -= 1;
    }
    throw new Error("Server did not start");
  });

  it("creates a tweet", async () => {
    const payload = {
      tweet: "This is a tweet",
    };
    let response = await request("localhost:5055").post("/tweet").send(payload);
    expect(response.status).toBe(200);
    expect(typeof response.body.id).toBe("string");

    response = await request("localhost:5055").get(
      `/tweet/${response.body.id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.tweet).toBe(payload.tweet);
  });
});

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
