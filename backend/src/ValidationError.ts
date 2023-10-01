export class ValidationError extends Error {
  private errors: Record<string, string[]> = {};

  constructor() {
    super("Validation error");
  }

  /**
   * Add or append a new error message to a field
   * @param field - new field or existing one
   * @param message - new message to add
   */
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
