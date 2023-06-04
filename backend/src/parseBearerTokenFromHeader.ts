/**
 * Parses the access token from the headers object.
 * Currently only supports the Bearer token type.
 */
export function parseBearerTokenFromHeader(headers: unknown) {
  if (headers === null) return null;
  if (typeof headers !== "object") return null;
  if (!hasAuthorizationProperty(headers)) return null;
  if (
    typeof headers.authorization !== "string" ||
    headers.authorization.trim() === ""
  ) {
    return null;
  }
  const split = headers.authorization.split(" ");
  if (split.length !== 2) return null;
  if (split[0] !== "Bearer") return null;
  if (split[1] === "") return null;

  return headers.authorization.split(" ")[1];
}

interface Headers {
  authorization: string;
}

function hasAuthorizationProperty(headers: object): headers is Headers {
  return "authorization" in headers;
}
