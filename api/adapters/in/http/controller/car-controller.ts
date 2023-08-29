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
import { CarValidation } from "../../../out/type-orm/postgres-adapter/models/data-validation/car-dto-validation";
import { ValidateCategory } from "../../../out/type-orm/postgres-adapter/models/data-validation/category-dto-validation";

export default class CreateCarController {
  static async createCar(req: Request, res: Response): Promise<Response> {
    const carRepositoryAdapter = new CarRepositoryAdapter();
    const carDTO = new CarValidation();

    try {
      carDTO.name = req.body.name;
      carDTO.description = req.body.description;
      carDTO.daily_rate = req.body.daily_rate;
      carDTO.license_plate = req.body.license_plate;
      carDTO.fine_amount = req.body.fine_amount;
      carDTO.brand = req.body.brand;
      carDTO.category_id = req.body.category_id;

      const createCar = new CarCreate(carRepositoryAdapter);

      const createdCar = await createCar.execute(carDTO);
      return res.status(201).json(createdCar);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.errors });
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
      console.log(cars);
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
    const carDTO = new CarValidation();

    try {
      carDTO.name = req.body.name;
      carDTO.description = req.body.description;
      carDTO.daily_rate = req.body.daily_rate;
      carDTO.license_plate = req.body.license_plate;
      carDTO.fine_amount = req.body.fine_amount;
      carDTO.brand = req.body.brand;
      carDTO.category_id = req.body.category_id;

      const updateCar = new carUpdate(carRepositoryAdapter);

      const updatedCar = await updateCar.execute(carDTO, carDTO.id);
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
    const categoryDTO = new ValidateCategory();

    try {
      categoryDTO.name = req.body.name;
      categoryDTO.description = req.body.description;

      const createCategory = new CategoryCreate(categoryRepositoryAdapter);

      const createdCategory = await createCategory.execute(categoryDTO);
      return res.status(201).json(createdCategory);

    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.errors });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: `${error}` });
    }
  }

  static async CategoryList(req: Request, res: Response): Promise<Response> {
    const categoryRepositoryAdapter = new CategoryRepositoryAdapter();
    try {
      const categories = await categoryRepositoryAdapter.list(1, 5);
      return res.status(200).json(categories);

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

