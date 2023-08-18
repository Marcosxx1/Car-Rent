import "reflect-metadata";


import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../../repository/ICarRepository";
import { ICarDTO } from "../../dtos/ICarDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { DataValidator } from "../../../../utils/ValidationData";

@injectable()
class CreateCarUseCase {
  private dataValidator: DataValidator;

  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) { }

  async execute(data: ICarDTO): Promise<void> {
    this.dataValidator = new DataValidator();

    await this.dataValidator.validateData(data);
    const car = await this.carRepository.findByLicensePlate(data.license_plate)
    if (car) {
      throw new AppError("Car already exists");
    }
    await this.carRepository.create(data);
  }
}

export { CreateCarUseCase };