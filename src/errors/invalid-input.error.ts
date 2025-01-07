import { ValidationType } from "../dto/validation-type";
import { CustomError } from "./custom-error";
import { HttpStatusCode } from "./httpStatusCodeEnum";

export class InvalidInputError extends CustomError {
  constructor(validationType: ValidationType, details?: any) {
    super(
      "Invalid input provided.",
      HttpStatusCode.BAD_REQUEST,
      "INVALID_INPUT",
      {
        validationType,
        ...details,
      }
    );
  }
}
