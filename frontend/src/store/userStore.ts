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
    setIsModalOpen: (open) => {set({ isModalOpen: open });
        if (!open) {
          set({ selectedUser: null }); // Limpia el usuario seleccionado al cerrar
        }
    },
    
    isEditMode: false,
    setIsEditMode: (mode) => set({ isEditMode: mode }),
    loading: false,
    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),

    // Obtener todos los usuarios
    fetchAllUsers: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/users/`);
            // Acceder al arreglo de usuarios dentro de la propiedad `data`
            const usersData = response.data.data;
    
            if (Array.isArray(usersData)) {
                try {
                    const validatedUsers = usersData.map((user: UserType) =>
                        UserSchema.parse(user)
                    );
                    set({ allUsers: validatedUsers, loading: false });
                } catch (validationError) {
                    console.error("Error de validación:", validationError);
                    set({ loading: false });
                }
            } else {
                console.error("Los datos de usuarios no son un arreglo:", usersData);
                set({ loading: false });
            }
        } catch (error) {
            console.error("Error buscando usuarios:", error);
            set({ loading: false });
        }
    },    
    
    // Obtener un usuario por ID
    getOneUser: async (userID) => {
        const token = localStorage.getItem("token"); // Obtiene el token de localStorage

        if (!token) {
            console.error("No se encontró el token de autorización.");
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/users/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
                },
            });

            const validatedUser = UserSchema.parse(response.data);
            set({ selectedUser: validatedUser });
        } catch (error) {
            set({ selectedUser: null });
            console.error(`Error fetching user with ID ${userID}:`, error);
        } finally {
            set({ loading: false });
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
        const token = localStorage.getItem("authToken"); // Obtener el token del localStorage
    
        if (!token) {
            console.error("No se encontró el token de autorización.");
            return; // Detener la ejecución si no hay token
        }
    
        console.log("Token enviado en la solicitud:", token); // Verifica que el token sea correcto
    
        try {
            const response = await axios.put(
                `${BASE_URL}/users/update/${userID}`,
                userData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Incluir el token en los encabezados
                    },
                }
            );
    
            console.log("Respuesta de la API:", response); // Verifica la respuesta de la API
    
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const updatedUser = UserSchema.parse(response.data); 
    
            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                ),
                selectedUser: null, 
            }));
        } catch (error) {
            console.error(`Error al actualizar usuario con ID ${userID}:`, error);
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
