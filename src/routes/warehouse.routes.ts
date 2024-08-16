import { Router } from "express";
import {
  isAuthenticated,
  validateRoles,
} from "../middlewares/authenticatedMiddleWare";
import {
  createWarehouse,
  deleteWarehouse,
  getWarehouseById,
  getWarehouses,
  updateWarehouse,
} from "../controllers/warehouse.controller";
import {
  createWarehouseValidation,
  deleteWarehouseValidation,
  getWarehouseByIdValidation,
  updateWarehouseValidation,
} from "../validations/warehouse.validation";
import { Roles } from "../interfaces/helper.interface";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getWarehouses)
  .post(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    createWarehouseValidation(),
    createWarehouse
  );

router
  .route("/:id")
  .get(isAuthenticated, getWarehouseByIdValidation(), getWarehouseById)
  .patch(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    updateWarehouseValidation(),
    updateWarehouse
  )
  .delete(
    validateRoles([Roles.ADMIN, Roles.MANAGER]),
    deleteWarehouseValidation(),
    deleteWarehouse
  );

export default router;
