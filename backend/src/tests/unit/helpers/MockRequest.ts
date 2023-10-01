import { Request } from "../../../RequestHandlers/Request";

export class MockRequest extends Request {
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
