import { AppError } from "../../adapters/in/http/utils/get-error";
import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";

export class ListCar {
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(): Promise<ICar[]> {
    const cars_found = await this.carAdapter.list();
    if (cars_found.length === 0) {
      throw new AppError("Car list is empty!", ['Error']);
    }
    return cars_found;
  }
}