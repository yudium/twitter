import { Request } from "../RequestHandlers/Request";
import { ValidationError } from "../ValidationError";

export type ErrorDetails = Record<string, string[]>;

export function validateRequest(
  req: Request,
  schema: Record<string, any>
): void {
  const error = new ValidationError();

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.getBody<unknown>(field);
    for (const rule of rules) {
      const error_message = rule(value);
      if (error_message) {
        error.addError(field, error_message);
      }
    }
  }

  if (error.totalErrors() > 0) {
    throw error;
  }
}
