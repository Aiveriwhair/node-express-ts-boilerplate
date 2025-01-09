import { NextFunction, Request, Response } from "express";
import { logger } from "../loggers/logger";
import { isObjectEmpty } from "../utils/helpers/is-object-empty";
import { CustomError } from "../errors/custom-error";

export const errorLoggingHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse = {
    date: new Date().toISOString(),
    url: req.originalUrl || req.url,
    method: req.method,
    body: isObjectEmpty(req.body) ? undefined : req.body,
    params: isObjectEmpty(req.params) ? undefined : req.params,
    query: isObjectEmpty(req.query) ? undefined : req.query,
  };

  if (err instanceof CustomError && err.statusCode < 500) {
    // Log the error with info level if it is a client error
    logger.info(
      JSON.stringify({ ...errorResponse, ...err.toLogObject() }, null, 2)
    );
  } else if (err instanceof CustomError && err.statusCode >= 500) {
    // Log the error with warn level if it is a server error
    logger.error(
      JSON.stringify({ ...errorResponse, ...err.toLogObject() }, null, 2)
    );
  } else {
    // Log the error with error level if it is a server error or unhandled error
    logger.error(
      JSON.stringify(
        {
          ...errorResponse,
          statusCode: 500,
          message: err.message,
          stack: err.stack,
        },
        null,
        2
      )
    );
  }

  next(err);
};
