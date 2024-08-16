import { IParams } from "./helper.interface";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  id: number;
}

export interface CreateProduct {
  name: string;
  price: number;
  description: string;
}
export interface IProductParams extends IParams {}
