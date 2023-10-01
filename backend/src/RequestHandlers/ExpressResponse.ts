import Express from "express";
import { ValidationError } from "../ValidationError";
import { Response } from "./Response";

export class ExpressResponse extends Response {
  constructor(private res: Express.Response) {
    super();
  }

  success(data?: Record<string, unknown>) {
    this.res.status(200).json({ data: data || null });
  }

  validationError(error: ValidationError) {
    this.res.status(400).json({
      message: "Validation error",
      errors: error.getErrors(),
    });
  }

  internalError() {
    this.res.status(500).json({
      message: "Internal server error",
      details: [],
    });
  }
}
