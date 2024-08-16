import ApiError from "../errors/apiError";
import { CreateProduct, IProductParams } from "../interfaces/product.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createProductService,
  deleteProductService,
  getByIdProductService,
  getProductsService,
  updateProductService,
} from "../services/product.service";

export const createProduct: ExpresFunction<CreateProduct> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createProductService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateProduct: ExpresFunction<Partial<CreateProduct>> = async (
  req,
  res,
  next
) => {
  try {
    const data = await updateProductService(req.params as IdParam, req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await deleteProductService(req.user.id, req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProducts: ExpresFunction<{}, IProductParams> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getProductsService(req.user.id, req.query);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductById: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getByIdProductService(
      req.user.id,
      req.params as IdParam
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
