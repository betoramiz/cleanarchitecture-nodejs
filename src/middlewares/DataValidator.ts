import { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from "../common/response";
import { ZodError, ZodObject } from "zod";

export const validateData = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    let issues: any;
    if(error instanceof ZodError) {
      issues = error.errors.map<ErrorMessage>(e => ({
        name: e.path[0].toString(),
        description: e.message
      }));
    } else {
      issues = error;
    }
    res.status(400).json(issues);
  }
}