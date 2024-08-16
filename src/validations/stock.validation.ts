import { Joi, validate } from "express-validation";

const createStockSchema = {
  body: Joi.object({
    quantity: Joi.number().required(),
    warehouseId: Joi.number().required(),
    productId: Joi.number().required(),
  }),
};
const updateStockSchema = {
  body: Joi.object({
    quantity: Joi.number(),
    warehouseId: Joi.number(),
    productId: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
const deleteStockSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getStockByIdSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
export const createStockValidation = () => {
  return validate(createStockSchema, { context: true }, { abortEarly: false });
};
export const updateStockValidation = () => {
  return validate(updateStockSchema, { context: true }, { abortEarly: false });
};

export const deleteStockValidation = () => {
  return validate(deleteStockSchema, { context: true }, { abortEarly: false });
};

export const getStockByIdValidation = () => {
  return validate(getStockByIdSchema, { context: true }, { abortEarly: false });
};
