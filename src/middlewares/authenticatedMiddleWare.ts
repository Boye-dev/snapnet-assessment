import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import { ExpresFunction, Roles } from "../interfaces/helper.interface";
import { NextFunction, Request } from "express";

export interface IUserDecoded extends JwtPayload {
  id: number;
  username: string;
  email: string;
  role: keyof typeof Roles;
}
export const isAuthenticated: ExpresFunction = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new ApiError(500, "JWT secret is not configured");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as IUserDecoded;

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new ApiError(401, "Token has expired");
    }

    (req as Request & { user?: IUserDecoded }).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRoles = (roles: string[]) => {
  return (req: any, res: any, next: NextFunction) => {
    isAuthenticated(req, res, (err) => {
      if (err) return next(err);

      const user = (req as Request & { user?: IUserDecoded }).user;
      if (!user || !roles.some((role) => user.role.includes(role))) {
        return next(
          new ApiError(403, "Forbidden: You cannot access this endpoint")
        );
      }

      next();
    });
  };
};
