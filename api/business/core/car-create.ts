import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";

export class CarCreate {
  private validateData: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
    this.validateData = new DataValidator();
  }

  async execute(car: ICar): Promise<ICar> {

    const carFound = await this.carAdapter.findByLicensePlate(car.license_plate)

    if (carFound) {
      throw ("Car already exists");
    }

    await this.validateData.validateCar(car);
    const createdCar = await this.carAdapter.create(car);
    return createdCar;

  }
}
