import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";

export class carUpdate {
  private validateData: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
    this.validateData = new DataValidator();
  }

  async execute(car: ICar, id: string): Promise<ICar> {

    const carFound = await this.carAdapter.findByLicensePlate(car.license_plate)

    if (carFound) {
      throw ("Car already exists!");
    }

    return this.carAdapter.update(car.id, car);
  }

}