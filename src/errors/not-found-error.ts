import { CustomError } from "@errors/custom-error";
import { HttpStatusCode } from "@errors/httpStatusCodeEnum";

export class NotFoundError extends CustomError {
  constructor(
    resource: string,
    message: string = "Not found",
    resourceField?: string
  ) {
    super(message, HttpStatusCode.NOT_FOUND, "NOT_FOUND", {
      resource,
      resourceField,
    });
  }
}
