import { NextFunction, Request, Response } from "express";
import { IUserDecoded } from "../middlewares/authenticatedMiddleWare";

export type ExpresFunction<B = {}, Q = {}> = (
  req: Request<{}, {}, B, Q> & { user?: IUserDecoded },
  res: Response,
  next: NextFunction
) => void;

export interface IdParam {
  id: number;
}
export interface IParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}
