import { Router } from "express";
import { createBlogHandler, deleteBlogHandler, getAllBlogsHandler, getOneBlogHandler, updateBlogHandler } from "../handlers/blogHandler.js";

const blogRouter = Router();

// Get All Blogs
blogRouter.get('/', getAllBlogsHandler);

// Get One Blog
blogRouter.get('/:id', getOneBlogHandler);

// Create Blog
blogRouter.post('/create', createBlogHandler);

// Update Blog
blogRouter.put('/update/:id', updateBlogHandler);

// Delete Blog
blogRouter.delete('/delete/:id', deleteBlogHandler);


export default blogRouter;
