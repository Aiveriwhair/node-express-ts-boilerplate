import { Router } from "express";
import exampleRouter from "./example.router";

const baseRouter = Router();

baseRouter.use("/example", exampleRouter);

export default baseRouter;
