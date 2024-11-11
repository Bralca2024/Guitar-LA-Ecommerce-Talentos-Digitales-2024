import { Router } from "express";
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getOneUserHandler, updateUserHandler } from "../handlers/usersHandlers.js";

const usersRouter = Router();

// Get All Products
usersRouter.get('/', getAllUsersHandler);
// Get One Product
usersRouter.get('/:id', getOneUserHandler)
// Create Product
usersRouter.post('/create', createUserHandler);
// Update Product
usersRouter.put('/update/:id', updateUserHandler);
// Delete Product
usersRouter.delete('/delete/:id', deleteUserHandler);

export default usersRouter;