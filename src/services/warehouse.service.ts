import { FindOptions, Op, Order } from "sequelize";
import Warehouse from "../models/Warehouse";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { IdParam } from "../interfaces/helper.interface";
import {
  CreateWarehouse,
  IWarehouseParams,
} from "../interfaces/warehouse.interface";

export const createWarehouseService = async (data: CreateWarehouse) => {
  const existingWarehouse = await Warehouse.findOne({
    where: {
      name: data.name,
    },
  });
  if (existingWarehouse) {
    throw new ApiError(
      400,
      `Warehouse with name: ${existingWarehouse.name} already exists`
    );
  }

  const newWarehouse = await Warehouse.create({ ...data });

  return new ApiResponse(201, "Warehouse Created Successfully", newWarehouse);
};

export const updateWarehouseService = async (
  param: IdParam,
  data: Partial<CreateWarehouse>
) => {
  const warehouse = await Warehouse.findByPk(param.id);
  if (!warehouse) {
    throw new ApiError(404, `Warehouse not found`);
  }

  const warehouseWithName = await Warehouse.findOne({
    where: { name: data.name },
  });
  if (warehouseWithName) {
    throw new ApiError(404, `Warehouse with name: ${data.name} already exists`);
  }

  const updatedWarehouse = await warehouse.update(data);

  return new ApiResponse(
    200,
    "Warehouse Updated Successfully",
    updatedWarehouse
  );
};

export const getWarehousesService = async (
  userId: number,
  query: IWarehouseParams
) => {
  const whereClause: any = { userId };

  if (query.search) {
    whereClause.name = { [Op.iLike]: `%${query.search}%` };
  }
  let page = 0;
  let pageSize = 10;
  let sort: string | undefined;

  if (query) {
    const {
      page: pageNumber = 0,
      pageSize: queryPageSize = 10,
      sort: querySort,
    } = query;
    page = Number(pageNumber);
    pageSize = Number(queryPageSize);
    sort = querySort;
  }

  const sortOrder: Order = sort
    ? [[sort.replace("-", ""), sort.startsWith("-") ? "DESC" : "ASC"]]
    : [];

  const options: FindOptions = {
    where: {
      where: whereClause,
    },
    order: sortOrder,
    offset: pageSize * page,
    limit: pageSize,
  };

  const { count: total, rows: results } = await Warehouse.findAndCountAll(
    options
  );
  return new ApiResponse(200, "Warehouses fetched successfully", {
    results,
    total,
    page,
    pageSize,
  });
};

export const getByIdWarehouseService = async (
  userId: number,
  param: IdParam
) => {
  const warehouse = await Warehouse.findByPk(param.id);

  if (!warehouse) {
    throw new ApiError(404, "Warehouse not found");
  }

  return new ApiResponse(200, "Warehouse fetched successfully", warehouse);
};

export const deleteWarehouseService = async (
  userId: number,
  param: IdParam
) => {
  const warehouse = await Warehouse.findByPk(param.id);

  if (!warehouse) {
    throw new ApiError(404, `Warehouse not found`);
  }

  await Warehouse.destroy({
    where: {
      id: param.id,
    },
  });

  return new ApiResponse(200, "Warehouse Deleted Successfully");
};
