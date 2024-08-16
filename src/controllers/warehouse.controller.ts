import ApiError from "../errors/apiError";
import {
  CreateWarehouse,
  IWarehouseParams,
} from "../interfaces/warehouse.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createWarehouseService,
  deleteWarehouseService,
  getByIdWarehouseService,
  getWarehousesService,
  updateWarehouseService,
} from "../services/warehouse.service";

export const createWarehouse: ExpresFunction<CreateWarehouse> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createWarehouseService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateWarehouse: ExpresFunction<Partial<CreateWarehouse>> = async (
  req,
  res,
  next
) => {
  try {
    const data = await updateWarehouseService(req.params as IdParam, req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteWarehouse: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await deleteWarehouseService(
      req.user.id,
      req.params as IdParam
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getWarehouses: ExpresFunction<{}, IWarehouseParams> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getWarehousesService(req.user.id, req.query);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getWarehouseById: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getByIdWarehouseService(
      req.user.id,
      req.params as IdParam
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
