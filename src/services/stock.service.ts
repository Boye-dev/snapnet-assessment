import { FindOptions, Op, Order } from "sequelize";
import Stock from "../models/Stock";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { IdParam } from "../interfaces/helper.interface";
import { CreateStock, IStockParams } from "../interfaces/stock.interface";

export const createStockService = async (data: CreateStock) => {
  const existingStock = await Stock.findOne({
    where: {
      productId: data.productId,
    },
  });
  if (existingStock) {
    throw new ApiError(400, `Product already exists`);
  }

  const newStock = await Stock.create({ ...data });

  return new ApiResponse(201, "Stock Created Successfully", newStock);
};

export const updateStockService = async (
  param: IdParam,
  data: Partial<CreateStock>
) => {
  const stock = await Stock.findByPk(param.id);
  if (!stock) {
    throw new ApiError(404, `Stock not found`);
  }

  const updatedStock = await stock.update(data);

  return new ApiResponse(200, "Stock Updated Successfully", updatedStock);
};

export const getStocksService = async (userId: number, query: IStockParams) => {
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

  const { count: total, rows: results } = await Stock.findAndCountAll(options);
  return new ApiResponse(200, "Stocks fetched successfully", {
    results,
    total,
    page,
    pageSize,
  });
};

export const getByIdStockService = async (param: IdParam) => {
  const stock = await Stock.findByPk(param.id);

  if (!stock) {
    throw new ApiError(404, "Stock not found");
  }

  return new ApiResponse(200, "Stock fetched successfully", stock);
};

export const deleteStockService = async (param: IdParam) => {
  const stock = await Stock.findByPk(param.id);

  if (!stock) {
    throw new ApiError(404, `Stock not found`);
  }

  await Stock.destroy({
    where: {
      id: param.id,
    },
  });

  return new ApiResponse(200, "Stock Deleted Successfully");
};
