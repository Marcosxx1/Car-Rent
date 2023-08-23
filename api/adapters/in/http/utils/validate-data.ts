import { validate, ValidationError } from "class-validator";
import { AppError } from "./get-error";
import { ICarDTO } from "../../../out/type-orm/postgres-adapter/models/car-dto";

class DataValidator {
  async validateData(data: any): Promise<void> {

    const errors = await validate(data);

    if (errors.length > 0) {
      const validationErrors = errors.map(
        (error: ValidationError) => Object.values(error.constraints)
      ).join(", ");
      throw new AppError(`Validation failed: ${validationErrors}`);
    }
  }


  async validateCar(data: ICarDTO): Promise<void> {
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
