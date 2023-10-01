import { Controller } from "../../RequestHandlers/Controller";
import { isString } from "../../RequestValidator/isString";
import { ValidationError } from "../../ValidationError";
import { MockRequest } from "./helpers/MockRequest";
import { getMockResponse } from "./helpers/getMockResponse";

describe("when the controller returns success data", () => {
  class SuccessDataReturnedStubController extends Controller {
    getValidationScheme() {
      return {};
    }

    async handle() {
      return { id: "new-tweet-id" };
    }
  }

  it("returns 200 response with that data", async () => {
    const res = getMockResponse();
    const req = new MockRequest();
    req.setBody({ content: "new tweet" });

    await new SuccessDataReturnedStubController(req, res).execute();

    expect(res.success).toHaveBeenCalledWith({ id: "new-tweet-id" });
  });
});

describe("when the controller returns success without data", () => {
  class SuccessWithNoDataReturnedStubController extends Controller {
    getValidationScheme() {
      return {};
    }

    async handle() {
      return;
    }
  }

  it("returns 200 response with no data", async () => {
    const res = getMockResponse();
    const req = new MockRequest();

    await new SuccessWithNoDataReturnedStubController(req, res).execute();

    expect(res.success).toHaveBeenCalledWith(undefined);
  });
});

describe("when the controller throws unexpected error", () => {
  class UnexpectedErrorStubController extends Controller {
    getValidationScheme() {
      return {};
    }

    async handle() {
      throw new Error("Unexpected error");
    }
  }

  it("returns 500 error", async () => {
    const res = getMockResponse();
    const req = new MockRequest();

    await new UnexpectedErrorStubController(req, res).execute();

    expect(res.success).not.toBeCalled();
    expect(res.internalError).toBeCalled();
  });
});

describe("when the controller throws validation error on request level", () => {
  class ValidationErrorStubController extends Controller {
    getValidationScheme() {
      return {
        tweet: [isString({ isRequired: true })],
      };
    }

    async handle() {
      return;
    }
  }

  it("returns 400 error", async () => {
    const res = getMockResponse();
    const req = new MockRequest();

    await new ValidationErrorStubController(req, res).execute();

    expect(res.validationError).toBeCalled();
    expect(res.success).not.toBeCalled();
    expect(res.internalError).not.toBeCalled();
  });
});

describe("when the controller throws validation error on use case level", () => {
  class ValidationErrorStubController extends Controller {
    getValidationScheme() {
      return {};
    }

    async handle() {
      const error = new ValidationError();
      error.addError("field", "error message");
      throw error;
    }
  }

  it("returns 400 error", async () => {
    const res = getMockResponse();
    const req = new MockRequest();

    await new ValidationErrorStubController(req, res).execute();

    expect(res.validationError).toBeCalled();
    expect(res.success).not.toBeCalled();
    expect(res.internalError).not.toBeCalled();
  });
});
