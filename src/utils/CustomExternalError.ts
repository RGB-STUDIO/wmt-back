interface ResponseError{
  message:string,
  errors:object[],
}

interface ResponseCodes{
  code:number
}

export class CustomExternalError {
  public readonly error: ResponseError;

  public readonly statusCode: ResponseCodes;

  constructor(error: ResponseError, statusCode: ResponseCodes) {
    this.error = error;
    this.statusCode = statusCode;
  }
}
