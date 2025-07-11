import { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from "@shared/Responses";
import { z } from "zod/v4";

export const validateData = (schema: z.ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    let issues: any;
    if(error instanceof z.ZodError) {
      issues = error.issues.map<ErrorMessage>(e => ({
        name: e.path[0].toString(),
        description: e.message
      }));
    } else {
      issues = error;
    }
    res.status(400).json(issues);
  }
}