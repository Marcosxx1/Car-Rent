import { CarPort } from "../ports/car-ports";

export default class CarDelete {
  carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(id: string) {
    const exist_car_with_id = await this.carAdapter.findById(id);

    if (!exist_car_with_id) {
      throw ("Car not found");
    }
    return this.carAdapter.delete(id);
  }
}