import { AppError } from "../../../../adapters/in/http/utils/get-error";
import { DataValidator } from "../../../../adapters/in/http/utils/validate-data";
import { CarValidation } from "../../../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";

describe('DataValidator', () => {
  let dataValidator: DataValidator;

  beforeEach(() => {
    dataValidator = new DataValidator();
  });

  it('should not throw an error if the data is valid', async () => {
    let validData = new CarValidation();
    validData = {
      id: "1",
      category_id: "1",
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand"
    };

    await expect(dataValidator.validateData(validData)).resolves.toBeUndefined();
  });

  it('should throw an AppError if the data is invalid', async () => {
    const invalidData: CarValidation = new CarValidation();
    invalidData.id = ""; // Invalid: id is empty
    invalidData.name = ""; // Invalid: name is empty
    invalidData.category_id = ""; // Invalid: category_id is empty
    invalidData.description = "Car Description";
    invalidData.daily_rate = 100;
    invalidData.license_plate = "ABC-1234";
    invalidData.fine_amount = 60;
    invalidData.brand = "Car Brand";

    await expect(dataValidator.validateData(invalidData)).rejects.toThrowError(AppError);
  });
})
