import z from "zod";

const UserSchema = z.object({
    _id: z.string().optional(), // El ID será opcional porque no está disponible al crear un nuevo usuario
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.string().email("Debe ser un email válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    fullName: z.string().min(3, "El nombre completo debe tener al menos 3 caracteres"),
    dateOfBirth: z.string().optional(), // Fecha de nacimiento como string ISO (opcional)
    phone: z.string().optional(), // Teléfono (opcional)
    address: z.string().optional(), // Dirección (opcional)
    role: z.enum(["admin", "user"]).default("user"), // Enum para roles
    createdAt: z.string().optional(), // Fecha de creación como string ISO (opcional)
});

export { UserSchema };
