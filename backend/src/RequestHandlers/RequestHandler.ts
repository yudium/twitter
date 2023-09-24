import Express from "express";
import { ValidationError } from "src/ValidationError";
import { validateRequest } from "../RequestValidator/validateRequest";

// RequestBody here needed for type casting in getBody method
export abstract class RequestHandler<RequestBody extends object> {
  constructor(private req: Express.Request, private res: Express.Response) {}

  // should returns data to be sent to client
  abstract getResponse(): Promise<Record<string, unknown>>;

  // should returns validation scheme for request body
  // @todo: ts type for callback rather than any
  abstract getValidationScheme(): Record<string, any>;

  /**
   * Get a field from request body
   */
  getBody<T extends keyof RequestBody>(
    key: keyof RequestBody
  ): RequestBody[T] | undefined {
    return (this.req.body[key] as RequestBody[T]) || undefined;
  }

  /**
   * Get param from request URI such as path/:key/detail
   */
  getParams(key: string): string {
    const param = this.req.params[key];

    if (param) {
      return param;
    }

    // param must be defined in route hence this should never happen unless the key is mistyped
    throw new Error(`Param ${key} not found`);
  }

  /**
   * Get query param from request such as ?key=value
   *
   * For empty query params, there are two conditions:
   * - defined but empty string, this function returns empty string
   * - not defined, this function returns undefined
   */
  getQuery(key: string): string | undefined {
    const query = this.req.query[key];

    if (query) {
      return query as string;
    }

    return typeof query === "string" ? "" : undefined;
  }

  /**
   * Called by the router to execute the request handler
   */
  async execute() {
    try {
      const validationScheme = this.getValidationScheme();
      if (Object.keys(validationScheme).length > 0) {
        console.log('>>> this.req');
        console.log(this.req.body);
        const { has_error, errors } = validateRequest(
          this.req,
          this.getValidationScheme()
        );
        if (has_error) {
          this.res.status(400).json({ errors });
          return;
        }
      }

      const response = await this.getResponse();
      this.res.status(200).json({ data: response });
    } catch (e) {
      if (e instanceof ValidationError) {
        this.res.status(400).json({
          message: "Validation error",
          details: e.getErrors(),
        });
        return;
      }

      this.res.status(500).json({
        message: "Internal server error",
        details: [],
      });
    }
  }
}
