import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  createSpecificationController.handle(req, res);
});

// specificationRoutes.get("/", (req: Request, res: Response) => {
//   const all = specificationRepository.list();
//   return res.json(all);
// });

export { specificationRoutes };
