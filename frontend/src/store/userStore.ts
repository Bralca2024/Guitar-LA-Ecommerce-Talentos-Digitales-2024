import { create } from "zustand";
import axios from "axios";
import { UserType } from "../types/type"; 
import { UserSchema } from "../schema/userSchema"; 

// Define el estado del store de usuarios
type UserState = {
    allUsers: UserType[]; // Lista de todos los usuarios
    isModalOpen: boolean; // Estado del modal
    setIsModalOpen: (open: boolean) => void; // Función para abrir/cerrar el modal
    isEditMode: boolean; // Modo de edición
    setIsEditMode: (edit: boolean) => void; // Cambiar el modo de edición
    loading: boolean; // Estado de carga
    selectedUser: UserType | null; // Usuario seleccionado
    setSelectedUser: (user: UserType | null) => void; // Establecer usuario seleccionado
    fetchAllUsers: () => Promise<void>; // Obtener todos los usuarios
    getOneUser: (userID: UserType["_id"]) => Promise<void>; // Obtener un usuario por ID
    createUser: (userData: UserType) => Promise<void>; // Crear un usuario
    updateUser: (userID: string, userData: UserType) => Promise<void>; // Actualizar un usuario
    deleteUser: (userID: UserType["_id"]) => Promise<void>; // Eliminar un usuario
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useUserStore = create<UserState>((set) => ({
    allUsers: [],
    isModalOpen: false,
    setIsModalOpen: (open) => set({ isModalOpen: open }),
    isEditMode: false,
    setIsEditMode: (mode) => set({ isEditMode: mode }),
    loading: false,
    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),

    // Obtener todos los usuarios
    fetchAllUsers: async () => {
        set({ loading: true });
        try {
        const response = await axios.get(`${BASE_URL}/users`);
        const usersData = response.data;

        const validatedUsers = usersData.map((user: UserType) =>
            UserSchema.parse(user)
        );

        set({ allUsers: validatedUsers, loading: false });
        } catch (error) {
        console.error("Error busqueda de usuarios:", error);
        set({ loading: false });
        }
    },

    // Obtener un usuario por ID
    getOneUser: async (userID) => {
        set({ loading: true });
        try {
            console.log("Búsqueda de usuario con ID:", userID); // Depuración
            const response = await axios.get(`${BASE_URL}/users/${userID}`);
            console.log("Respuesta API:", response.data); // Depuración
            try {
                const validatedUser = UserSchema.parse(response.data);
                set({ selectedUser: validatedUser, loading: false });
            } catch (validationError) {
                console.error("Error de validación:", validationError);
                set({ selectedUser: null, loading: false });
            }
        } catch (error) {
            console.error(`Error fetching user with ID ${userID}:`, error);
            set({ selectedUser: null, loading: false });
        }
    },    

    // Crear un usuario
    createUser: async (userData) => {
        try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        const newUser = UserSchema.parse(response.data);
        set((state) => ({ allUsers: [...state.allUsers, newUser] }));
        } catch (error) {
        console.error("Error creating user:", error);
        }
    },

    // Actualizar un usuario
    updateUser: async (userID, userData) => {
        try {
        const response = await axios.put(
            `${BASE_URL}/users/update/${userID}`,
            userData
        );
        const updatedUser = UserSchema.parse(response.data);

        set((state) => ({
            allUsers: state.allUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
            ),
            selectedUser: null,
        }));
        } catch (error) {
        console.error(`Error updating user with ID ${userID}:`, error);
        }
    },

    // Eliminar un usuario
    deleteUser: async (userID) => {
        try {
        await axios.delete(`${BASE_URL}/users/delete/${userID}`);
        set((state) => ({
            allUsers: state.allUsers.filter((user) => user._id !== userID),
        }));
        } catch (error) {
        console.error(`Error deleting user with ID ${userID}:`, error);
        }
    },
}));
