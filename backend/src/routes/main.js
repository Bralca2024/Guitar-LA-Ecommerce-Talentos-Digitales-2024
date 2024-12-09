import { Router } from "express";
import authRouter from "./authRoutes.js";
import usersRouter from "./usersRoutes.js";
import productsRouter from "./productsRoutes.js";
import paymentRouter from './paymentRoutes.js';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/payment', paymentRouter);


export default mainRouter;