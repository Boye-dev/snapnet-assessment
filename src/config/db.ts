import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("snapnet_db", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
export const connectDb = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
