import { Joi, validate } from "express-validation";

const createProductSchema = {
  body: Joi.object({
    description: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};
const updateProductSchema = {
  body: Joi.object({
    description: Joi.string(),
    name: Joi.string(),
    price: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
const deleteProductSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getProductByIdSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
export const createProductValidation = () => {
  return validate(
    createProductSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const updateProductValidation = () => {
  return validate(
    updateProductSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const deleteProductValidation = () => {
  return validate(
    deleteProductSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const getProductByIdValidation = () => {
  return validate(
    getProductByIdSchema,
    { context: true },
    { abortEarly: false }
  );
};
