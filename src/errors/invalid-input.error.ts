import { ValidationType } from "@dto/validation-type";
import { CustomError } from "@errors/custom-error";
import { HttpStatusCode } from "@errors/httpStatusCodeEnum";

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
