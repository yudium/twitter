import Express from "express";
import { Request } from "./Request";

export class ExpressRequest extends Request {
  constructor(private req: Express.Request) {
    super();
  }

  getBody<T>(field: string): T | undefined {
    const value = this.req.body[field];

    if (value) {
      return value as T;
    }

    return undefined;
  }

  getParam(key: string): string {
    const param = this.req.params[key];

    if (param) {
      return param;
    }

    // param must be defined in route hence this should never happen unless the key is mistyped
    throw new Error(`Param ${key} not found`);
  }

  getQuery(key: string): string | undefined {
    return this.req.query[key] as string | undefined;
  }
}
