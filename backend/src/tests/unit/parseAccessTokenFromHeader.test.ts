import { parseAccessTokenFromHeader } from "../../parseAccessTokenFromHeader";

function expectNull(headers: unknown) {
  const result = parseAccessTokenFromHeader(headers);
  expect(result).toBeNull();
}

describe(parseAccessTokenFromHeader.name, () => {
  it("returns access token", () => {
    const result = parseAccessTokenFromHeader({
      authorization: "Bearer accessToken",
    });
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
