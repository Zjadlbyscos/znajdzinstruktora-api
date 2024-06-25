export class ApiError {
  constructor(code, message, status) {
    this.code = code;
    this.message = message;
    this.status = status;
  }

  static badRequest(msg = `Bad Request`) {
    return new ApiError(400, msg, `BAD REQUEST`);
  }

  static unauthorized(msg = `Unauthorized`) {
    return new ApiError(401, msg, `UNAUTHORIZED`);
  }

  static forbidden(msg = `Forbidden`) {
    return new ApiError(403, msg, `FORBIDDEN`);
  }

  static notFound(msg = `Not Found`) {
    return new ApiError(404, msg, `NOT FOUND`);
  }

  static conflict(msg = `Conflict`) {
    return new ApiError(409, msg, `CONFLICT`);
  }

  static internal(msg = `Internal Server Error`) {
    return new ApiError(500, msg, `INTERNAL SERVER ERROR`);
  }
}
