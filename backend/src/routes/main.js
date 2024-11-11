import { Router } from "express";
import productsRouter from "./productsRoutes.js";
import usersRouter from "./usersRoutes.js";

const mainRouter = Router();

mainRouter.use('/products', productsRouter);
mainRouter.use('/users', usersRouter);

export default mainRouter;