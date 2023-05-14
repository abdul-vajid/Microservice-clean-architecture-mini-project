import express from "express";
import authRoutes from "./authRoutes";

export const routes = (dependencies: any) => {
  const routes = express.Router();

  routes.use("/auth", authRoutes(dependencies));
  return routes;
};
