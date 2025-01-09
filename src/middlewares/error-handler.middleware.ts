import { NextFunction, Request, Response } from "express";
import { ResponseErrorDto } from "../dto/responses/response-error.dto";
import { sendResponse } from "../utils/send-response";
import { CustomError } from "../errors/custom-error";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const errorResponse = new ResponseErrorDto(err);
    sendResponse(res, errorResponse);
    return;
  }

  // If the error is not an instance of CustomError, we will return a generic error message with least information
  const errorResponse = ResponseErrorDto.fromUnknownError(err);
  sendResponse(res, errorResponse);
};
