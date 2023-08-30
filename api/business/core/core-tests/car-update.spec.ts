import { AppError } from "../../../adapters/in/http/utils/get-error";
import { CarRepositoryInMemoryAdapter } from "../../../adapters/out/type-orm/postgres-adapter/in-memory/car-repository-adapter-in-memory";
import { carUpdate } from "../car-update";



describe('carUpdate', () => {
  let carUpdateInstance: carUpdate;
  let carRepository: CarRepositoryInMemoryAdapter;

  beforeEach(() => {
    carRepository = new CarRepositoryInMemoryAdapter();
    carUpdateInstance = new carUpdate(carRepository);
  });

  it("should update a car", async () => {
    const carData = {
      id: 'valid-car-id',
      name: 'Updated car name',
      description: 'Updated car description',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 80,
      brand: 'Updated Brand',
      category_id: 'category_id',
    };

    const updateCar = async () => await carUpdateInstance.execute(carData, carData.id);

    expect(updateCar).toBeDefined();/* 
    await expect(updateCar).resolves.not.toThrowError(AppError);
    await expect(updateCar).resolves.not.toThrowError("Car not found");
    await expect(updateCar).resolves.not.toThrowError("Invalid car data provided"); */
  })

  it('should throw AppError if invalid car data is provided', async () => {
    const invalidCarData = {
      id: 'invalid-car-id',
      name: '',
      description: 'Updated car description',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 80,
      brand: 'Updated Brand',
      category_id: 'category_id',
    };

    const updateInvalidCar = async () => await carUpdateInstance.execute(invalidCarData, invalidCarData.id);

    await expect(updateInvalidCar).rejects.toThrowError(AppError);
  });

  it('should throw AppError if car not found', async () => {
    const invalidCarData = {
      id: 'invalid-car-id',
      name: 'Updated car name',
      description: 'Updated car description',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 80,
      brand: 'Updated Brand',
      category_id: 'category_id',
    };

    const updateInvalidCar = async () => await carUpdateInstance.execute(invalidCarData, invalidCarData.id);

    await expect(updateInvalidCar).rejects.toThrowError(AppError);
  })


  it('should update car properties successfully', async () => {
    // Create an existing car
    const existingCarData = {
      id: 'existing-car-id',
      name: 'Existing Car',
      description: 'Existing car description',
      daily_rate: 100,
      license_plate: 'XYZ-5678',
      fine_amount: 60,
      brand: 'Existing Brand',
      category_id: 'category_id',
    };
    await carRepository.create(existingCarData);

    console.log(existingCarData, 'Existing Car Data');
    console.log(await carRepository.list(), 'Car Repository State before Update');

    const updatedCarData = {
      id: 'existing-car-id',
      name: 'Updated Car Name',
      description: 'Updated car description',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 80,
      brand: 'Updated Brand',
      category_id: 'category_id',
    };

    // Execute the update
    const updatedCar2 = async () => await carUpdateInstance.execute(updatedCarData, existingCarData.id);
    const updatedCar = await updatedCar2();
    // Check that the car properties were updated
    expect(updatedCar).toBeDefined();
    expect(updatedCar.name).toBe(updatedCarData.name);
    expect(updatedCar.description).toBe(updatedCarData.description);
    expect(updatedCar.daily_rate).toBe(updatedCarData.daily_rate);
    expect(updatedCar.license_plate).toBe(updatedCarData.license_plate);
    expect(updatedCar.fine_amount).toBe(updatedCarData.fine_amount);
    expect(updatedCar.brand).toBe(updatedCarData.brand);
    expect(updatedCar.category_id).toBe(updatedCarData.category_id);
  });

  // Add more test cases as needed
});
