export class ValidationError extends Error {
  constructor(private errors: Record<string, string[]>) {
    super("Validation error");
  }

  getErrors() {
    return this.errors;
  }
}
