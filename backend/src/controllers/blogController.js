import Blog from '../schema/Blog.js'; // Importa el esquema Blog
import { deleteImageFromCloudinary } from '../utilities/cloudinary.js'; // Asegúrate de que la función esté correctamente importada


// Obtener todos los blogs
const getAllBlogsController = async () => {
  if (!Blog) throw new Error("Blogs not found");
  return await Blog.find();
};

// Obtener un blog por ID
const getOneBlogController = async (blogID) => {
  const blog = await Blog.findById(blogID);
  if (!blog) throw new Error("Blog not found");
  return blog;
};

// Crear un nuevo blog
const createBlogController = async (title, content, author, imageUrl) => {
  const newBlog = new Blog({ title, content, author, imageUrl });
  return await newBlog.save();
};

// Actualizar un blog existente
const updateBlogController = async (blogID, title, content, author, imageUrl) => {
  const blogData = { title, content, author, imageUrl };
  const updatedBlog = await Blog.findByIdAndUpdate(blogID, blogData, { new: true });
  if (!updatedBlog) throw new Error("Blog not found");
  return updatedBlog;
};

// Eliminar un blog por ID
const deleteBlogController = async (blogID) => {
  try {
    // Verifica si el blog existe
    const existBlog = await Blog.findById(blogID);
    if (!existBlog) throw new Error("Blog not found");

    // Si el blog tiene una imagen asociada, elimina la imagen en Cloudinary
    if (existBlog.imageUrl) {
      const publicId = existBlog.imageUrl.split('/').pop().split('.')[0]; // Extrae el publicId de la URL
      await deleteImageFromCloudinary(`blogs/${publicId}`);
    }

    // Elimina el blog de la base de datos
    await existBlog.deleteOne();
    return { message: "Blog deleted successfully" };

  } catch (error) {
    console.error(`Error deleting blog with ID ${blogID}:`, error.stack);
    throw new Error("Failed to delete blog");
  }
};

export {
  getAllBlogsController,
  getOneBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController
};
