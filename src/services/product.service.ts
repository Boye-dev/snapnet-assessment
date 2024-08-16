import { FindOptions, Op, Order } from "sequelize";
import Product from "../models/Product";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { IdParam } from "../interfaces/helper.interface";
import { CreateProduct, IProductParams } from "../interfaces/product.interface";

export const createProductService = async (data: CreateProduct) => {
  const existingProduct = await Product.findOne({
    where: {
      name: data.name,
    },
  });
  if (existingProduct) {
    throw new ApiError(
      400,
      `Product with name: ${existingProduct.name} already exists`
    );
  }

  const newProduct = await Product.create({ ...data });

  return new ApiResponse(201, "Product Created Successfully", newProduct);
};

export const updateProductService = async (
  param: IdParam,
  data: Partial<CreateProduct>
) => {
  const product = await Product.findByPk(param.id);
  if (!product) {
    throw new ApiError(404, `Product not found`);
  }

  const productWithName = await Product.findOne({
    where: { name: data.name },
  });
  if (productWithName) {
    throw new ApiError(404, `Product with name: ${data.name} already exists`);
  }

  const updatedProduct = await product.update(data);

  return new ApiResponse(200, "Product Updated Successfully", updatedProduct);
};

export const getProductsService = async (
  userId: number,
  query: IProductParams
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

  const { count: total, rows: results } = await Product.findAndCountAll(
    options
  );
  return new ApiResponse(200, "Products fetched successfully", {
    results,
    total,
    page,
    pageSize,
  });
};

export const getByIdProductService = async (userId: number, param: IdParam) => {
  const product = await Product.findByPk(param.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return new ApiResponse(200, "Product fetched successfully", product);
};

export const deleteProductService = async (userId: number, param: IdParam) => {
  const product = await Product.findByPk(param.id);

  if (!product) {
    throw new ApiError(404, `Product not found`);
  }

  await Product.destroy({
    where: {
      id: param.id,
    },
  });

  return new ApiResponse(200, "Product Deleted Successfully");
};
