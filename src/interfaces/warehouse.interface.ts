import { IParams } from "./helper.interface";

export interface IWarehouse {
  name: string;
  location: string;
  capacity: number;
  id: number;
}

export interface CreateWarehouse {
  name: string;
  location: string;
  capacity: number;
}
export interface IWarehouseParams extends IParams {}
