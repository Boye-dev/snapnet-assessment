import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { CreateProduct, IProduct } from "../interfaces/product.interface";

class Product extends Model<IProduct, CreateProduct> implements IProduct {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
  }
);

export default Product;
