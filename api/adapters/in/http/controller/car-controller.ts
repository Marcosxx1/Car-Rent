import "reflect-metadata";
import { Request, Response } from "express";
import { CarRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/car-repository-adapter"
import { ICar } from "../../../../business/entities/Car";
import { CarCreate } from "../../../../business/core/car-create";
import { AppError } from "../utils/get-error";
import CarDelete from "../../../../business/core/car-delete";
import { carUpdate } from "../../../../business/core/car-update";
import { SpecificationCreate } from "../../../../business/core/specification-create";
import { SpecificationRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/specification-repository-adapter";
import { CategoryRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/category-repository-adapter";
import { CategoryCreate } from "../../../../business/core/category-create";

export default class CreateCarController {
  static async createCar(req: Request, res: Response): Promise<Response> {
    const carRepositoryAdapter = new CarRepositoryAdapter();
    try {
      const carData: ICar = req.body;
      const createCar = new CarCreate(carRepositoryAdapter);
      const createdCar = await createCar.execute(carData);
      return res.status(201).json(createdCar);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async carDelete(req: Request, res: Response): Promise<Response> {
    const carRepositoryAdapter = new CarRepositoryAdapter();
    try {
      const id: ICar["id"] = req.params.id;
      const deleteCar = new CarDelete(carRepositoryAdapter);
      await deleteCar.execute(id);
      return res.status(200).json({ status: "success", message: "Deleted successfully" });

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async carList(req: Request, res: Response): Promise<Response> {
    const carRepositoryAdapter = new CarRepositoryAdapter();
    try {
      const cars = await carRepositoryAdapter.list();
      return res.status(200).json(cars);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async carUpdate(req: Request, res: Response): Promise<Response> {
    const carRepositoryAdapter = new CarRepositoryAdapter();
    try {
      const id: ICar["id"] = req.params.id;
      const carData: ICar = req.body;
      const updateCar = new carUpdate(carRepositoryAdapter);

      const updatedCar = await updateCar.execute(carData, id);
      return res.status(200).json(updatedCar);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async SpecificationCreate(req: Request, res: Response): Promise<Response> {
    const specificationRepositoryAdapter = new SpecificationRepositoryAdapter();
    try {
      const { name, description } = req.body;
      const createSpecification = new SpecificationCreate(specificationRepositoryAdapter);

      const createdSpecification = await createSpecification.execute({ name, description });
      return res.status(201).json(createdSpecification);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async SpecificationList(req: Request, res: Response): Promise<Response> {
    const specificationRepositoryAdapter = new SpecificationRepositoryAdapter();
    try {
      const specifications = await specificationRepositoryAdapter.list();
      return res.status(200).json(specifications);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async CategoryCreate(req: Request, res: Response): Promise<Response> {
    const categoryRepositoryAdapter = new CategoryRepositoryAdapter();
    try {
      const { name, description } = req.body;
      const createCategory = new CategoryCreate(categoryRepositoryAdapter);

      const createdCategory = await createCategory.execute({ name, description });
      return res.status(201).json(createdCategory);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    } 
  }
}

