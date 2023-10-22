// CustomError.ts
export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public data?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
