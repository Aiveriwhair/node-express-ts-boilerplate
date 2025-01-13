import { CustomError } from "@errors/custom-error";
import { HttpStatusCode } from "@errors/httpStatusCodeEnum";

export class ResponseAlreadySentError extends CustomError {
  constructor(message: string = "Response already sent.", details?: any) {
    super(message, HttpStatusCode.INTERNAL_SERVER, "ALREADY_SENT", details);
  }
}
