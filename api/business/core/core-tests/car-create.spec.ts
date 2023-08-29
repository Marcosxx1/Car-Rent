
import { AppError } from "../../../adapters/in/http/utils/get-error";
import { CarRepositoryInMemoryAdapter } from "../../../adapters/out/type-orm/postgres-adapter/in-memory/car-repository-adapter-in-memory";
import { DataValidator } from "../../../adapters/in/http/utils/validate-data";
import { CarCreate } from "../car-create";

let createCar: CarCreate;
let carRepository: CarRepositoryInMemoryAdapter;

describe("Car Create", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemoryAdapter();
    createCar = new CarCreate(carRepository);
  })

  it("should be able to create a new car", async () => {
    const car = await createCar.execute({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id"
    });

    expect(car).toBeInstanceOf(Object)
  })

  it("should not be able to create a new car with exists license plate", async () => {
    await createCar.execute({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id"
    });

    await expect(createCar.execute({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id"
    })).rejects.toThrowError(AppError)
  })


  test("Should not be able to create a car with available true by default", async () => {
    const car = await createCar.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id",
    });
    console.log(car);

    expect(car.available).toBe(true)
  })

  it("should be able to create a new car with available false", async () => {
    const car = await createCar.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id",
      available: false
    });

    expect(car.available).toBe(false)
  })

  it(" should be able to create a new car with a name, description, daily_rate, license_plate, fine_amount, brand and category_id", async () => {
    const car = await createCar.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category_id",
    });

    expect(car).toHaveProperty("name")
    expect(car).toHaveProperty("description")
    expect(car).toHaveProperty("daily_rate")
    expect(car).toHaveProperty("license_plate")
    expect(car).toHaveProperty("fine_amount")
    expect(car).toHaveProperty("brand")
    expect(car).toHaveProperty("category_id")
  })

})

