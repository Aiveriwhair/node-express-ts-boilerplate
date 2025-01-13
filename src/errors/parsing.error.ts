import { CustomError } from "@errors/custom-error";
import { HttpStatusCode } from "@errors/httpStatusCodeEnum";

export class ParsingError extends CustomError {
  constructor(value: any, message: string = "Parsing error.", details?: any) {
    super(message, HttpStatusCode.INTERNAL_SERVER, "PARSING", {
      value,
      ...details,
    });
  }
}
