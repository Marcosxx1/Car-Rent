import "reflect-metadata"

import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


describe("CreateCategoryController", () => {
  test("should call CreateCategoryUseCase with the name and description", async () => {
    const mockName = "Test Category";
    const mockDescription = "Test Description";

    const mockRequest = {
      body: {
        name: mockName,
        description: mockDescription,
      },
    } as Request;

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const createCategoryUseCaseMock = {
      execute: jest.fn(),
    };

    container.resolve = jest.fn().mockReturnValue(createCategoryUseCaseMock);

    const createCategoryController = new CreateCategoryController();

    await createCategoryController.handle(mockRequest, mockResponse);

    expect(container.resolve).toBeCalledWith(CreateCategoryUseCase);
    expect(createCategoryUseCaseMock.execute).toBeCalledWith({
      name: mockName,
      description: mockDescription,
    });
    expect(mockResponse.status).toBeCalledWith(201);
    expect(mockResponse.send).toBeCalled();
  });
});
