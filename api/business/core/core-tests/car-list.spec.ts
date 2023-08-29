import { CarRepositoryInMemoryAdapter } from "../../../adapters/out/type-orm/postgres-adapter/in-memory/car-repository-adapter-in-memory";
import { ListCar } from "../car-list";


let carList: ListCar;
let carRepository: CarRepositoryInMemoryAdapter;

describe("List Car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemoryAdapter();
    carList = new ListCar(carRepository);
  });

  it("should be able to list all cars", async () => {
    const car = await carRepository.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car1 brand",
      category_id: "category_id",
    });

    const cars = await carList.execute();

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by name", async () => {
    const car = await carRepository.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car2 brand",
      category_id: "category_id",
    });

    const cars = await carList.execute
  })

  it("should not list if there is no car", async () => {
    const cars = await carList.execute();

    expect(cars).toEqual([]);
  })

})

