import z from "zod";

// Esquema para el blog
const BlogSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "El título es requerido"),
  content: z.string().min(1, "El contenido es requerido"),
  author: z.string().min(1, "El autor es requerido"),
  imageUrl: z.string().url().nullable().optional(), // Puede ser nulo o no proporcionado
  createdAt: z.date().default(() => new Date()), // Fecha de creación
  updatedAt: z.date().default(() => new Date()), // Fecha de actualización
  isPublished: z.boolean().default(true), // Estado de publicación del blog
});

export { BlogSchema };
