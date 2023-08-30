import { CarRepositoryInMemoryAdapter } from "../../../adapters/out/type-orm/postgres-adapter/in-memory/car-repository-adapter-in-memory";
import { AppError } from "../../../adapters/in/http/utils/get-error";
import CarDelete from "../car-delete";


let carDelete: CarDelete;
let carRepository: CarRepositoryInMemoryAdapter;

describe("CarDelete", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemoryAdapter();
    carDelete = new CarDelete(carRepository);
  })

  it("should be able to delete a car", async () => {
    const car = await carRepository.create({
      id: "1",
      name: "Car 1",
      description: "Car description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id"
    });

    await carDelete.execute(car.id);

    const carDeleted = await carRepository.findById(car.id);

    expect(carDeleted).toBeUndefined

  })

  it("should not be able to delete a car that does not exist", async () => {
    await expect(carDelete.execute("1")).rejects.toEqual("Car not found");
  })
})