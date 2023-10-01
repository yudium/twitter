/**
 * Reasons this class born:
 * - To avoid coupling with Express request
 * - Consistent with Request class
 */
export abstract class Request {
  abstract getBody<T>(field: string): T;

  abstract getParam(key: string): string | undefined;

  abstract getQuery(key: string): string | undefined;
}
