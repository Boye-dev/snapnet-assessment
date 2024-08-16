import { Joi, validate } from "express-validation";

const createWarehouseSchema = {
  body: Joi.object({
    location: Joi.string().required(),
    name: Joi.string().required(),
    capacity: Joi.number().required(),
  }),
};
const updateWarehouseSchema = {
  body: Joi.object({
    location: Joi.string(),
    name: Joi.string(),
    capacity: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
const deleteWarehouseSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getWarehouseByIdSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
export const createWarehouseValidation = () => {
  return validate(
    createWarehouseSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const updateWarehouseValidation = () => {
  return validate(
    updateWarehouseSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const deleteWarehouseValidation = () => {
  return validate(
    deleteWarehouseSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const getWarehouseByIdValidation = () => {
  return validate(
    getWarehouseByIdSchema,
    { context: true },
    { abortEarly: false }
  );
};
