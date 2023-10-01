import { ValidationError } from "src/ValidationError";

/**
 * Reasons this class born:
 * - To avoid coupling with Express response
 * - For easier testing, instead of mocking Express response that contains
 *   chaining methods with jest. Additionally, it is more readable in the test context.
 */
export abstract class Response {
  abstract success(data?: Record<string, unknown> | void): void;
  abstract validationError(data: ValidationError): void;
  abstract internalError(): void;
}
