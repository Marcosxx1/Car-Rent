import { validate, ValidationError } from "class-validator";
import { AppError } from "./get-error";

class DataValidator {
  async validateData(data: Object): Promise<void> {

    const errors = await validate(data);

    if (errors.length > 0) {
      const validationErrors = errors.flatMap((error: ValidationError) =>
        Object.values(error.constraints)
      );
      throw new AppError("Validation failed", validationErrors);
    }

  }
}

export { DataValidator };
