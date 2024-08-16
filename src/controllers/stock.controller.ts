import ApiError from "../errors/apiError";
import { CreateStock, IStockParams } from "../interfaces/stock.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createStockService,
  deleteStockService,
  getByIdStockService,
  getStocksService,
  updateStockService,
} from "../services/stock.service";

export const createStock: ExpresFunction<CreateStock> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createStockService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateStock: ExpresFunction<Partial<CreateStock>> = async (
  req,
  res,
  next
) => {
  try {
    const data = await updateStockService(req.params as IdParam, req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteStock: ExpresFunction = async (req, res, next) => {
  try {
    const data = await deleteStockService(req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getStocks: ExpresFunction<{}, IStockParams> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getStocksService(req.user.id, req.query);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getStockById: ExpresFunction = async (req, res, next) => {
  try {
    const data = await getByIdStockService(req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
