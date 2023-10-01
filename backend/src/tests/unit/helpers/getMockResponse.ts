export function getMockResponse() {
  return {
    success: jest.fn(),
    validationError: jest.fn(),
    internalError: jest.fn(),
  };
}
