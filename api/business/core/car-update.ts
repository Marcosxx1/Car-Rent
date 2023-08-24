import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { ICarDTO } from "../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";

export class carUpdate {
  private dataValidator: DataValidator;
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(car: ICarDTO, id: string): Promise<ICar> {
    this.dataValidator = new DataValidator();

    await this.dataValidator.validateData(car);

    return this.carAdapter.update(car.id, car);
  }

}