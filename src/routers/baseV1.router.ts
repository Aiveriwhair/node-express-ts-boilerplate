import { Router } from "express";
import exampleRouter from "@routers/example.router";

const baseV1Router = Router();

baseV1Router.use("/example", exampleRouter);

export default baseV1Router;
