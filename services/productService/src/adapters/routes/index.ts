import express from "express";
import productRoutes from "./productRoutes";

export const routes = (dependencies: any) => {
  const routes = express.Router();

  routes.use("/product", productRoutes(dependencies));
  return routes;
};
