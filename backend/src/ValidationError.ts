export class ValidationError extends Error {
  private errors: Record<string, string[]> = {};

  constructor() {
    super("Validation error");
  }

  addError(field: string, message: string) {
    this.errors[field] = this.errors[field] || [];
    this.errors[field].push(message);
  }

  totalErrors() {
    return Object.keys(this.errors).length;
  }

  getErrors() {
    return this.errors;
  }
}
