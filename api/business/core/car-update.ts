import { AppError } from "../../adapters/in/http/utils/get-error";
import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { CarValidation } from "../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";
export class carUpdate {
  private dataValidator: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(car: CarValidation, id: string): Promise<ICar> {
    this.dataValidator = new DataValidator();

    // Validate the car data
    await this.dataValidator.validateData(car);

    // Retrieve the existing car by ID
    const existingCar = await this.carAdapter.findById(id);
    console.log(existingCar, '------ existing car CARUPDATE')

    if (!existingCar) {
      throw new AppError("Car not found", ["Car with provided ID not found"], 404);
    }

    // Update the existing car's properties
    existingCar.name = car.name;
    existingCar.description = car.description;
    existingCar.daily_rate = car.daily_rate;
    existingCar.license_plate = car.license_plate;
    existingCar.fine_amount = car.fine_amount;
    existingCar.brand = car.brand;
    existingCar.category_id = car.category_id;

    // Update the car in the repository
    return this.carAdapter.update(existingCar.id, existingCar);
  }
}
