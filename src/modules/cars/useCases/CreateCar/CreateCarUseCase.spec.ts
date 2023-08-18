import { CreateCarUseCase } from "./CreateCarUseCase";
import { ICarRepository } from "../../repository/ICarRepository";
import { ICarDTO } from "../../dtos/ICarDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";

describe("CreateCarUseCase", () => {
  let createCarUseCase: CreateCarUseCase;
  let carRepositoryMock: jest.Mocked<ICarRepository>;

  beforeEach(() => {
    carRepositoryMock = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
      findByLicensePlate: jest.fn(),
      findAvailable: jest.fn(),
      findById: jest.fn(),
      updateAvailable: jest.fn(),
    };

    createCarUseCase = new CreateCarUseCase(carRepositoryMock);
  });


  it("should create a new car", async () => {
    const data: Car = {
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Category ID",
      created_at: new Date(),
      id: "ASDASDASDASDASD"
    };
    carRepositoryMock.findByLicensePlate.mockResolvedValueOnce(null);
    carRepositoryMock.create.mockResolvedValueOnce();

    await expect(createCarUseCase.execute({ data })).resolves.not.toThrow();
    expect(carRepositoryMock.findByLicensePlate).toHaveBeenCalledWith(data.license_plate);
    expect(carRepositoryMock.create).toHaveBeenCalledWith(data);
  });

  it("should not create a new car with license plate exists", async () => {
    const data: Car = {
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Category ID",
      created_at: new Date(),
      id: "ASDASDASDASDASD"
    };
    carRepositoryMock.findByLicensePlate.mockResolvedValueOnce(data);

    await expect(createCarUseCase.execute({ data })).rejects.toBeInstanceOf(AppError);
    expect(carRepositoryMock.findByLicensePlate).toHaveBeenCalledWith(data.license_plate);
  })
});
