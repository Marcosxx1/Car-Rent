import { AppError } from "../../adapters/in/http/utils/get-error";
import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { CarValidation } from "../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { CarPort } from "../ports/car-ports";

export class CarCreate {
  private dataValidator: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(car: CarValidation): Promise<CarValidation> {
    this.dataValidator = new DataValidator();

    await this.dataValidator.validateData(car);

    const carFound = await this.carAdapter.findByLicensePlate(car.license_plate)

    if (carFound) {
      throw new AppError("Error: ", ["Car already exists"], 400);
    }

    const createdCar = await this.carAdapter.create(car);
    return createdCar;

  }
}
