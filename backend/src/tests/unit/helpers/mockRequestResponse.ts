import { Request } from "../../../RequestHandlers/Request";

class MockRequest extends Request {
  private body: Record<string, any> = {};
  private params: Record<string, any> = {};
  private query: Record<string, any> = {};

  constructor() {
    super();
  }

  getBody(field: string): any {
    return this.body[field];
  }

  getParam(key: string): any {
    return this.params[key];
  }

  getQuery(key: string): any {
    return this.query[key] as any;
  }

  setBody(body: Record<string, any>) {
    this.body = body;
  }

  setParams(params: Record<string, any>) {
    this.params = params;
  }

  setQuery(query: Record<string, any>) {
    this.query = query;
  }
}

function getMockResponse() {
  return {
    success: jest.fn(),
    validationError: jest.fn(),
    internalError: jest.fn(),
  };
}

/**
 * getMockResponse() and MockRequest are using different patterns, to avoid
 * confusion to the clients, we wrap them in a single function to not expose the way
 * they created.
 */
export function mockRequestResponse() {
  return {
    req: new MockRequest(),
    res: getMockResponse(),
  };
}
