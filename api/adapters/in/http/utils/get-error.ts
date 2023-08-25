export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly errors: string[];

  constructor(message: string, errors: string[], statusCode = 400) {
    super(`${message}: ${errors.join(", ")}`);
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}