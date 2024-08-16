import { Joi, validate } from "express-validation";
import { Roles } from "../interfaces/helper.interface";

const createUserSchema = {
  body: Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.values(Roles))
      .required(),
  }),
};

const loginUserSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokenSchema = {
  body: Joi.object({
    token: Joi.string().required(),
  }),
};
export const createUserValidation = () => {
  return validate(createUserSchema, { context: true }, { abortEarly: false });
};
export const loginUserValidation = () => {
  return validate(loginUserSchema, { context: true }, { abortEarly: false });
};

export const refreshTokenValidation = () => {
  return validate(refreshTokenSchema, { context: true }, { abortEarly: false });
};
