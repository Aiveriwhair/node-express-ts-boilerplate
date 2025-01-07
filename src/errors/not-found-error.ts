import { CustomError } from "./custom-error";
import { HttpStatusCode } from "./httpStatusCodeEnum";

export class NotFoundError extends CustomError {
  constructor(resource: string, resourceField?: string) {
    super("Not found", HttpStatusCode.NOT_FOUND, "NOT_FOUND", {
      resource,
      resourceField,
    });
  }
}
