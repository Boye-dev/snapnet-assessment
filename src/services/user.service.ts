import ApiError from "../errors/apiError";
import {
  CreateUserRequest,
  IUserLogin,
  IUserRefresh,
} from "../interfaces/user.interface";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../errors/apiResponse";
import { IUserDecoded } from "../middlewares/authenticatedMiddleWare";

const saltRounds = 13;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const createUserService = async (data: CreateUserRequest) => {
  const user = await User.findOne({ where: { email: data.email } });
  if (user) {
    throw new ApiError(400, `User with ${user.email} already exists`);
  }
  const userWithUsername = await User.findOne({
    where: { username: data.username },
  });
  if (userWithUsername) {
    throw new ApiError(
      400,
      `User with ${userWithUsername.username} already exists`
    );
  }
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const newUser = await User.create(data);

  return new ApiResponse(200, "User Created Successfully", newUser);
};

export const loginService = async (data: IUserLogin) => {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    throw new ApiError(400, `Invalid Email/Password`);
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new ApiError(400, `Invalid Email/Password`);
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "6d" });

  return new ApiResponse(200, "Login Successful", {
    accessToken,
    refreshToken,
  });
};

export const refreshService = async (data: IUserRefresh) => {
  const decoded = jwt.verify(data.token, JWT_SECRET) as IUserDecoded;

  if (!decoded) {
    throw new ApiError(400, `Invalid Token`);
  }

  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new ApiError(401, `User not found`);
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" });

  return new ApiResponse(200, "Refresh successful", { accessToken });
};
