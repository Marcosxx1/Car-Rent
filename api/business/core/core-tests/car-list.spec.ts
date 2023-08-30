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


  it('should list all cars successfully', async () => {
    // Create some cars in the repository
    const car1 = {
      name: "Car1",
      description: "Car2 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car2 brand",
      category_id: "category_id",
    }
    const car2 = {
      name: "Car2",
      description: "Car2 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car2 brand",
      category_id: "category_id",
    }
    await carRepository.create(car1);
    await carRepository.create(car2);

    const carsList = await carList.execute();

    expect(carsList).toBeDefined();
    expect(carsList.length).toBe(2); // Check that both cars are in the list
    // Add more assertions if needed
  });

  it("should throw an error if there is no cars in the list", async () => {
    await expect(carList.execute()).rejects.toThrow("Car list is empty!");
  });
})

