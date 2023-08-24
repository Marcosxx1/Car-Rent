import Express from 'express';
import CreateUserController from './controller/user-controller';
import CreateCarController
  from './controller/car-controller';
const app = Express();
app.use(Express.json());

import "../../out/type-orm"

import { LoginController } from './controller/login-controller';


const port = process.env.PORT || 3000;

app.post('/users', CreateUserController.createUser);
app.post('/sessions', LoginController.login)
app.post('/cars', CreateCarController.createCar);
app.get('/cars', CreateCarController.carList);
app.post('/specifications', CreateCarController.SpecificationCreate);
app.get('/specifications', CreateCarController.SpecificationList);
app.post('/categories', CreateCarController.CategoryCreate)
app.delete('/cars/:id', CreateCarController.carDelete);
app.put('/cars/:id', CreateCarController.carUpdate);

app.listen(port, async () => {
  console.log(`Listening on Port ${port}`);
});