import { CarRepositoryInMemoryAdapter } from "../../../adapters/out/type-orm/postgres-adapter/in-memory/car-repository-adapter-in-memory";
import { CarValidation } from "../../../adapters/out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { carUpdate } from "../car-update";


let carUpdateVairiable: carUpdate;
let carRepository: CarRepositoryInMemoryAdapter;

describe("Car Update", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemoryAdapter();
    carUpdateVairiable = new carUpdate(carRepository);
  });

  it("should be able to update a car", async () => {
    let carValid = new CarValidation();

    carValid = await carRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });


    expect(carUpdated).toHaveProperty("id");
  })
})
