import { Router } from "express";
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getOneProductHandler, updateProductHandler } from "../handlers/productsHandler.js";

const productsRouter = Router();

// Get All Products
productsRouter.get('/', getAllProductsHandler);
// Get One Product
productsRouter.get('/:id', getOneProductHandler)
// Create Product
productsRouter.post('/create', createProductHandler);
// Update Product
productsRouter.put('/update/:id', updateProductHandler);
// Delete Product
productsRouter.delete('/delete/:id', deleteProductHandler);

export default productsRouter;