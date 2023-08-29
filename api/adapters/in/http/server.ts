import Express, { NextFunction, Request, Response } from "express";
import CreateUserController from './controller/user-controller';
import CreateCarController
  from './controller/car-controller';
import { EnsureAdmin } from "./middlewares/ensure-admin";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../../swagger.json";

const app = Express();
app.use(Express.json());

import "../../out/type-orm"

import { LoginController } from './controller/login-controller';
import { AppError } from "./utils/get-error";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


const port = process.env.PORT || 3000;

app.post('/users', CreateUserController.createUser);
app.post('/sessions', LoginController.login)
app.post('/cars', CreateCarController.createCar);
app.get('/cars', CreateCarController.carList);

app.post('/specifications', CreateCarController.SpecificationCreate);
app.get('/specifications', ensureAuthenticated, EnsureAdmin, CreateCarController.SpecificationList);
app.post('/categories', CreateCarController.CategoryCreate)
app.get('/categories', CreateCarController.CategoryList)

app.delete('/cars/:id', CreateCarController.carDelete);
app.put('/cars/:id', CreateCarController.carUpdate);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}/api-docs`);
});
