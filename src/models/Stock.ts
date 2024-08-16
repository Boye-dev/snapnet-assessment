import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import Warehouse from "./Warehouse";
import { CreateStock, IStock } from "../interfaces/stock.interface";
import Product from "./Product";

class Stock extends Model<IStock, CreateStock> implements IStock {
  public id!: number;
  public productId!: number;
  public warehouseId!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,

      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    warehouseId: {
      type: DataTypes.INTEGER.UNSIGNED,

      allowNull: false,
      references: {
        model: Warehouse,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stocks",
    timestamps: true,
    modelName: "Stock",
  }
);

Stock.belongsTo(Product, { foreignKey: "productId", as: "products" });
Stock.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouses" });

export default Stock;
