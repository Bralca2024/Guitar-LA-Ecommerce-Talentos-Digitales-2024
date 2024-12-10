import {create} from 'zustand';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


interface AuthState{
    role: string | null;
    token: string | null;
    userID: string | null; 
    setRole: (role: string | null) => void;
    setToken: (token: string | null) => void;
    setUserID: (userID: string | null) => void;
    refreshToken: () => Promise<void>;
    logout: () => void;
}

const decodeJWT = (token: string): any | null => {
    try {
        const payload = token.split('.')[1]; // Obtiene la parte del payload
        const decodedPayload = atob(payload); // Decodifica de Base64 a texto
        return JSON.parse(decodedPayload); // Convierte el texto JSON a un objeto
    } catch (error) {
        console.error("Error al decodificar el JWT:", error);
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el token
      const expirationTime = payload.exp * 1000; // El campo `exp` está en segundos, convierte a milisegundos
      return Date.now() > expirationTime; // Verifica si ya pasó la expiración
    } catch {
      return true; // Si algo falla, se asume que el token ha expirado
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    role: localStorage.getItem("role"),
    setRole: (role) => {
        if (role) {
        localStorage.setItem("role", role);
        } else {
        localStorage.removeItem("role");
        }
        set({ role });
    },
    token: localStorage.getItem("token"),
    userID: (() => {
        const token = localStorage.getItem("token");
        if (token) {
        const decoded = decodeJWT(token);
        return decoded?.id || null; // Asegúrate de que "userID" exista en el payload
        }
        return null;
    })(),
    setToken: (token) => {
        if (token) {
        localStorage.setItem("token", token);
        const decoded = decodeJWT(token);
        set({ userID: decoded?.id || null }); // Actualiza userID con el valor del token
        } else {
        localStorage.removeItem("token");
        set({ userID: null });
        }
        set({ token });
    },
    setUserID: (userID) => {
        if (userID) {
        localStorage.setItem("userID", userID);
        } else {
        localStorage.removeItem("userID");
        }
        set({ userID });
    },
    refreshToken: async () => {
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)) {
        console.warn("Token inválido o expirado. Cerrando sesión.");
        useAuthStore.getState().logout(); // Cerrar sesión si no hay token válido
        return;
        }

        try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const newToken = response.data.token;
        useAuthStore.getState().setToken(newToken); // Actualiza el token
        } catch (error) {
        console.error("Error al renovar el token:", error);
        useAuthStore.getState().logout(); // Si falla, cerrar sesión
        }
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        set({ token: null, role: null, userID: null });
    },
    }));

    // Interceptores de Axios
    axios.interceptors.request.use(async (config) => {
    const { token, refreshToken } = useAuthStore.getState();

    if (token && isTokenExpired(token)) {
        await refreshToken(); // Renueva el token si está expirado
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`; // Actualiza el header con el nuevo token
    } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});