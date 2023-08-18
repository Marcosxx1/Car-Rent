import "reflect-metadata";

import { Request, Response } from "express";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { container } from "tsyringe";
import { ICarDTO } from "../../dtos/ICarDTO";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const carDTO = new ICarDTO();
    carDTO.name = req.body.name;
    carDTO.description = req.body.description;
    carDTO.daily_rate = req.body.daily_rate;
    carDTO.license_plate = req.body.license_plate;
    carDTO.fine_amount = req.body.fine_amount;
    carDTO.brand = req.body.brand;
    carDTO.category_id = req.body.category_id;

    const createCarUseCase = container.resolve(CreateCarUseCase);


    await createCarUseCase.execute(carDTO);
    return res.status(201).send();
  }
}

export { CreateCarController }