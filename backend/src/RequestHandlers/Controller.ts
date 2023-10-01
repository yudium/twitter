import { validateRequest } from "../RequestValidator/validateRequest";
import { ValidationError } from "../ValidationError";
import { Request } from "./Request";
import { Response } from "./Response";

// RequestBody here needed for type casting in getBody method
export abstract class Controller {
  constructor(protected req: Request, protected res: Response) {}

  // should returns data to be sent to client
  abstract handle(): Promise<Record<string, unknown> | void>;

  // should returns validation scheme for request body
  // @todo: ts type for callback rather than any
  abstract getValidationScheme(): Record<string, any>;

  /**
   * Called by the router to handle the request
   */
  async execute() {
    try {
      const validationScheme = this.getValidationScheme();
      if (Object.keys(validationScheme).length > 0) {
        validateRequest(this.req, this.getValidationScheme());
      }

      const response = await this.handle();
      this.res.success(response);
    } catch (e) {
      if (e instanceof ValidationError) {
        this.res.validationError(e);
        return;
      }
      this.res.internalError();
    }
  }
}
