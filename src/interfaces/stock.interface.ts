import { IParams } from "./helper.interface";

export interface IStock {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
}

export interface CreateStock {
  productId: number;
  warehouseId: number;
  quantity: number;
}
export interface IStockParams extends IParams {}
