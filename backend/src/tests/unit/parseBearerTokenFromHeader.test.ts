import { parseBearerTokenFromHeader } from "../../parseBearerTokenFromHeader";

function expectNull(headers: unknown) {
  const result = parseBearerTokenFromHeader(headers);
  expect(result).toBeNull();
}

describe(parseBearerTokenFromHeader.name, () => {
  it("returns access token", () => {
    const result = parseBearerTokenFromHeader({
      authorization: "Bearer accessToken",
    });
    expect(true).toBe(false);
    expect(result).toBe("accessToken");
  });

  describe("When authorization header is not present", () => {
    it("returns null", () => {
      expectNull({});
      expectNull(null);
    });
  });

  describe("When header is not a Bearer token", () => {
    it("returns null", () => {
      expectNull({
        authorization: "Basic bash64encodedstring",
      });
    });
  });

  describe("When header has no token after Bearer keyword", () => {
    it("returns null", () => {
      expectNull({
        authorization: "Bearer",
      });
      expectNull({
        authorization: "Bearer ",
      });
    });
  });
});
