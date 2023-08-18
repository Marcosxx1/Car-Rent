import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../../swagger.json";
import { router } from "./routes";

import "../typeorm/"

import "../../container";


import { AppError } from "../../errors/AppError";

const app = express();

const port = 3000;

app.use(express.json());

app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
