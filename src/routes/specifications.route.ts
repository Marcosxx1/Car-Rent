import { Request, Response, Router } from "express";

import { SpecificaionRepository } from "../modules/cars/repository/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecifiationService";

const specificationRoutes = Router();
const specificationRepository = new SpecificaionRepository();

specificationRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository,
  );

  createSpecificationService.execute({ name, description });
  return res.status(201).send();
});

specificationRoutes.get("/", (req: Request, res: Response) => {
  const all = specificationRepository.list();
  return res.json(all);
});

export { specificationRoutes };
