export {};
class ApiErrors extends Error {
  private status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static unAuthorizedError(message: string) {
    return new ApiErrors(401, message);
  }

  static badRequest(message: string) {
    return new ApiErrors(404, message);
  }

  static internal(message: string) {
    return new ApiErrors(500, message);
  }

  static forbidden(message: string) {
    return new ApiErrors(403, message);
  }
}

module.exports = ApiErrors;
