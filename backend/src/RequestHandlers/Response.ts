import { ValidationError } from "src/ValidationError";

export abstract class Response {
  abstract success(data?: Record<string, unknown> | void): void;
  abstract validationError(data: ValidationError): void;
  abstract internalError(): void;
}
