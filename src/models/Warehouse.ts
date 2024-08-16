import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { CreateWarehouse, IWarehouse } from "../interfaces/warehouse.interface";

class Warehouse
  extends Model<IWarehouse, CreateWarehouse>
  implements IWarehouse
{
  public id!: number;
  public name!: string;
  public capacity!: number;
  public location!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Warehouse.init(
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
    capacity: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "warehouses",
    modelName: "Warehouse",
    timestamps: true,
  }
);

export default Warehouse;
