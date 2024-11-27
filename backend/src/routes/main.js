import { Router } from "express";
import authRouter from "./authRoutes.js";
import usersRouter from "./usersRoutes.js";
import productsRouter from "./productsRoutes.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);

export default mainRouter;