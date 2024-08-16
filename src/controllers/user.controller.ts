import ApiError from "../errors/apiError";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  CreateUserRequest,
  IUserLogin,
  IUserRefresh,
} from "../interfaces/user.interface";
import User from "../models/User";
import {
  createUserService,
  loginService,
  refreshService,
} from "../services/user.service";

export const createUser: ExpresFunction<CreateUserRequest> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createUserService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login: ExpresFunction<IUserLogin> = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const refresh: ExpresFunction<IUserRefresh> = async (req, res, next) => {
  try {
    const data = await refreshService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
