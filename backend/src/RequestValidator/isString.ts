export function isString({
  isRequired,
}: {
  isRequired: boolean;
}): (value: unknown) => string {
  return (value: unknown): string => {
    if (typeof value !== "string") {
      return "Value must be a string";
    }

    if (isRequired && value.trim() === "") {
      return "Value is cannot be empty";
    }

    return "";
  };
}
