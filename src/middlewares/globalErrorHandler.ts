import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
} from "sequelize";

interface CustomError extends Error {
  [key: string]: any;
}

export const globalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = error?.statusCode || 500;
  let message = error?.message || "Internal Server Error";
  let fields: { message: string; path: string | number }[] = [];

  if (error instanceof ValidationError) {
    if (error.details.body) {
      const errors = error.details.body?.map((value) => {
        return { message: value.message, path: value.path[0] };
      });
      fields = [...fields, ...errors];
    }
    if (error.details.params) {
      const errors = error.details.params?.map((value) => {
        return { message: value.message, path: value.path[0] };
      });
      fields = [...fields, ...errors];
    }
    if (error.details.query) {
      const errors = error.details.query?.map((value) => {
        return { message: value.message, path: value.path[0] };
      });
      fields = [...fields, ...errors];
    }
  }

  if (error instanceof UniqueConstraintError) {
    statusCode = 400;
    message = "Unique constraint error";
    fields = [
      {
        message: error.errors.map((e) => e.message).join(", "),
        path: "unique",
      },
    ];
  } else if (error instanceof ForeignKeyConstraintError) {
    statusCode = 400;
    message = "Foreign key constraint error";
    fields = [
      {
        message: error.message,
        path: "foreignKey",
      },
    ];
  } else if (error instanceof DatabaseError) {
    statusCode = 500;
    message = "Database error";
    fields = [
      {
        message: error.message,
        path: "database",
      },
    ];
  }
  return res.status(statusCode).json({
    error: error.name,
    status: statusCode,
    message: message,
    ...(fields.length > 0 && {
      fields,
    }),
  });
};
