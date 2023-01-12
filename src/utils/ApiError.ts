export class ApiError extends Error {
  message = '';
  errors: unknown;
  statusCode: number;
  constructor(message: string, errors: unknown, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
  }
}
