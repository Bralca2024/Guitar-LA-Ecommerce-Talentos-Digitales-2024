import mongoose from 'mongoose';
import { createBlogController, deleteBlogController, getAllBlogsController, getOneBlogController, updateBlogController } from '../controllers/blogController.js';
import Blog from '../schema/Blog.js';
import { uploadBlogImage, deleteImageFromCloudinary } from '../utilities/cloudinary.js';

const getAllBlogsHandler = async (req, res) => {
  try {
    const response = await getAllBlogsController();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: `Error fetching blogs: ${error.message}` });
  }
};

const getOneBlogHandler = async (req, res) => {
  try {
    const { id: blogID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogID)) {
      return res.status(400).json({ error: 'The ID isn´t valid' });
    }

    const response = await getOneBlogController(blogID);

    if (!response) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog: ' + error.message });
  }
};

const createBlogHandler = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.files?.image;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    let imageUrl = null;

    // Verifica si se ha subido una imagen
    if (image) {
      const result = await uploadBlogImage(image.tempFilePath); // Sube la imagen
      imageUrl = result.secure_url; // Obtiene la URL segura de la imagen
    }

    const response = await createBlogController(title, content, author, imageUrl);

    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog: ' + error.message });
  }
};

const updateBlogHandler = async (req, res) => {
  try {
    const { id: blogID } = req.params;
    const { title, content, author } = req.body;
    const image = req.files?.image;

    // Busca el blog existente para obtener la URL de la imagen actual
    const existingBlog = await Blog.findById(blogID);

    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    let imageUrl = existingBlog.imageUrl; // Mantiene la URL actual por defecto

    if (image) {
      // Si hay una nueva imagen, elimina la anterior de Cloudinary
      if (existingBlog.imageUrl) {
        const publicId = existingBlog.imageUrl.split('/').slice(-1)[0].split('.')[0];
        
        await deleteImageFromCloudinary(publicId);
      }

      const result = await uploadImage(image.tempFilePath);
      imageUrl = result.secure_url; // Actualiza con la nueva URL
    }

    const response = await updateBlogController(blogID, title, content, author, imageUrl);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: `Error updating the blog: ${error.message}` });
  }
};

const deleteBlogHandler = async (req, res) => {
  try {
    const { id: blogID } = req.params;

    const blog = await Blog.findById(blogID);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Solo eliminar la imagen si existe
    if (blog.imageUrl) {
      // Extraemos el publicId de la URL de la imagen
      const publicId = blog.imageUrl.split('/').slice(-2).join('/').split('.')[0];
      
      // Llamamos a la función de eliminación de imagen en Cloudinary
      await deleteImageFromCloudinary(publicId);
    }

    // Eliminar el blog
    await deleteBlogController(blogID);

    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: `Error deleting the blog: ${error.message}` });
  }
};




export {
  getAllBlogsHandler,
  getOneBlogHandler,
  createBlogHandler,
  updateBlogHandler,
  deleteBlogHandler
};
