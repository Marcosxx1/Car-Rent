import { validate, ValidationError } from "class-validator";
import { AppError } from "./get-error";

class DataValidator {
  async validateData(data: Object): Promise<void> {
    console.log("Validating data:", data);

    const errors = await validate(data);
    console.log("Validation errors:", errors);

    if (errors.length > 0) {
      const validationErrors = errors.flatMap((error: ValidationError) =>
        Object.values(error.constraints)
      );
      throw new AppError("Validation failed", validationErrors);
    }

  }
}

export { DataValidator };
