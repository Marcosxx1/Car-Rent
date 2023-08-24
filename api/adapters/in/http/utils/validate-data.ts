import { validate, ValidationError } from "class-validator";
import { AppError } from "./get-error";
import { ICarDTO } from "../../../out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";

class DataValidator {
  async validateData(data: ICarDTO): Promise<void> {
    console.log("Validating data:", data);

    const errors = await validate(data);
    console.log("Validation errors:", errors);

    if (errors.length > 0) {
      const validationErrors = errors.map(
        (error: ValidationError) => Object.values(error.constraints)
      ).join(", ");
      throw new AppError(`Validation failed: ${validationErrors}`);
    }
  }
}

export { DataValidator };
