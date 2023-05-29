const request = require("supertest");

beforeAll(async () => {
  const DELAY = 400;
  let retries = 10;
  while (true && retries > 0) {
    try {
      let response = await request("localhost:5055").get("/status");
      if (response.status === 200) {
        return;
      }
    } catch (e) {
        //
    }
    await delay(DELAY);
    retries -= 1;
  }
  throw new Error("Server did not start");
});

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
