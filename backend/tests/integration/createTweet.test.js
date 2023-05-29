const request = require("supertest");

describe("When /tweet/create called", () => {
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
