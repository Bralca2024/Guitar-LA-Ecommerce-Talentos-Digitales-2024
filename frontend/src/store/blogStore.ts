import { BlogType } from "../types/type";
import { create } from "zustand";
import axios from "axios";
import { BlogSchema } from "../schema/blogSchema";

// Define el estado del store de blogs
type BlogState = {
  allBlogs: BlogType[]; // Lista de todos los blogs
  isModalOpen: boolean; // Estado del modal (verdadero o falso)
  setIsModalOpen: (open: boolean) => void; // Función para cambiar el estado del modal
  isEditMode: boolean; // Estado que indica si se está en modo de edición
  setIsEditMode: (edit: boolean) => void; // Función para cambiar el estado de edición
  loading: boolean; // Estado de carga
  selectedBlog: BlogType | null; // Blog seleccionado para ver o editar
  setSelectedBlog: (blog: BlogType | null) => void; // Función para establecer el blog seleccionado
  fetchAllBlogs: () => Promise<void>; // Función para obtener todos los blogs
  getOneBlog: (blogID: BlogType["_id"]) => Promise<void>; // Función para obtener un blog específico por ID
  createBlog: (blogData: FormData) => Promise<void>; // Función para crear un nuevo blog
  updateBlog: (blogData: FormData) => Promise<void>; // Función para actualizar un blog existente
  deleteBlog: (blogID: BlogType["_id"]) => Promise<void>; // Función para eliminar un blog
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useBlogStore = create<BlogState>((set) => ({
  allBlogs: [],
  isModalOpen: false,
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  isEditMode: false,
  setIsEditMode: (mode) => set({ isEditMode: mode }),
  loading: true,
  selectedBlog: null,
  setSelectedBlog: (blog) => set({ selectedBlog: blog }),
  
  fetchAllBlogs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      const blogData = response.data;
  
      const validatedBlogs = blogData.map((blog: BlogType) => {
        // Convertir las cadenas de fechas a objetos Date
        const parsedBlog = {
          ...blog,
          createdAt: new Date(blog.createdAt), // Convertir createdAt
          updatedAt: new Date(blog.updatedAt), // Convertir updatedAt
        };
  
        return BlogSchema.parse(parsedBlog);
      });
  
      set({ allBlogs: validatedBlogs });
      set({ loading: false });
    } catch (error) {
      throw new Error(`fetching blogs. ${error}`);
    } finally {
      set({ loading: false });
    }
  },
  

  getOneBlog: async (blogID) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${blogID}`);
      const responseData = response.data;
      const validatedBlog = BlogSchema.parse(responseData);

      set({ selectedBlog: validatedBlog });
      set({ loading: false });
    } catch (error) {
      set({ selectedBlog: null });
      throw new Error(`Error fetching blog with ID ${blogID}: ${error}`);
    } finally {
      set({ loading: false });
    }
  },

  createBlog: async (blogData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/blogs/create`,
        blogData
      );
      const newBlog = BlogSchema.parse(response.data);

      set((state) => ({
        allBlogs: [...state.allBlogs, newBlog],
      }));
    } catch (error) {
      throw new Error(`Error creating blog: ${error}`);
    }
  },
  
  updateBlog: async (blogData) => {
    try {
      const blogId = blogData.get("_id");
      const response = await axios.put(
        `${BASE_URL}/blogs/update/${blogId}`,
        blogData
      );
      const updatedBlog = BlogSchema.parse(response.data);

      set((state) => ({
        allBlogs: state.allBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        ),
        selectedBlog: null,
      }));
    } catch (error) {
      throw new Error(
        `Error updating blog with ID ${blogData.get("_id")}: ${error}`
      );
    }
  },
  
  deleteBlog: async (blogID) => {
    try {
      await axios.delete(`${BASE_URL}/blogs/delete/${blogID}`);
      set((state) => ({
        allBlogs: state.allBlogs.filter((blog) => blog._id !== blogID),
      }));
    } catch (error) {
      throw new Error(
        `Error deleting blog with ID: ${blogID}. Error: ${error}`
      );
    }
  },
}));
