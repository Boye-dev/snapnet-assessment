import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import ApiError from "./errors/apiError";
import { connectDb } from "./config/db";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import wareHouseRoutes from "./routes/warehouse.routes";
import stockRoutes from "./routes/stock.routes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

const corsOption = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOption));
connectDb();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", wareHouseRoutes);
app.use("/api/stocks", stockRoutes);

app.listen(PORT, () => {
  console.log("Server Listening on port 4000...");
});

app.all("*", (req, _res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on the server!`));
});
app.use(globalErrorHandler);
