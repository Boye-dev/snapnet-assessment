import { Router } from "express";
import {
  isAuthenticated,
  validateRoles,
} from "../middlewares/authenticatedMiddleWare";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import {
  createProductValidation,
  deleteProductValidation,
  getProductByIdValidation,
  updateProductValidation,
} from "../validations/product.validation";
import { Roles } from "../interfaces/helper.interface";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getProducts)
  .post(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    createProductValidation(),
    createProduct
  );

router
  .route("/:id")
  .get(isAuthenticated, getProductByIdValidation(), getProductById)
  .patch(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    updateProductValidation(),
    updateProduct
  )
  .delete(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    deleteProductValidation(),
    deleteProduct
  );

export default router;
