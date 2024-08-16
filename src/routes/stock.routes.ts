import { Router } from "express";
import {
  isAuthenticated,
  validateRoles,
} from "../middlewares/authenticatedMiddleWare";
import {
  createStock,
  deleteStock,
  getStockById,
  getStocks,
  updateStock,
} from "../controllers/stock.controller";
import {
  createStockValidation,
  deleteStockValidation,
  getStockByIdValidation,
  updateStockValidation,
} from "../validations/stock.validation";
import { Roles } from "../interfaces/helper.interface";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getStocks)
  .post(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    createStockValidation(),
    createStock
  );

router
  .route("/:id")
  .get(isAuthenticated, getStockByIdValidation(), getStockById)
  .patch(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    updateStockValidation(),
    updateStock
  )
  .delete(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    deleteStockValidation(),
    deleteStock
  );

export default router;
