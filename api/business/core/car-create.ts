import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { ICarDTO } from "../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { CarPort } from "../ports/car-ports";

export class CarCreate {
  private dataValidator: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(car: ICarDTO): Promise<ICarDTO> {
    this.dataValidator = new DataValidator();

    await this.dataValidator.validateData(car);

    const carFound = await this.carAdapter.findByLicensePlate(car.license_plate)

    if (carFound) {
      throw ("Car already exists");
    }

    const createdCar = await this.carAdapter.create(car);
    return createdCar;

  }
}
