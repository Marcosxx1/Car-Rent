import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';


export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({
    name: "NodeJS",
    educator: "M.A.S",
    duration: 1
  });

  return res.send();
}