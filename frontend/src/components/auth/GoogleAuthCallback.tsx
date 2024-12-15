import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const GoogleAuthCallback = () => {
    const { setToken, setRole } = useAuthStore();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchGoogleToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
    
            if (code) {
                try {
                    const response = await fetch(`${baseUrl}/auth/google/callback?code=${code}`);
                    const data = await response.json();
    
                    console.log("Respuesta de Google Auth:", data); // Aquí puedes inspeccionar la respuesta
    
                    if (response.ok) {
                        setToken(data.token); // Guarda el token en el estado
                        setRole(data.user.role); // Guarda el rol del usuario en el estado
                        navigate("/"); // Redirige al perfil después de autenticarse
                    } else {
                        console.error("Error de autenticación con Google:", data);
                    }
                } catch (error) {
                    console.error("Error al obtener el token:", error);
                }
            }
        };
    
        fetchGoogleToken();
    }, [baseUrl, setToken, setRole, navigate]);
    

    return <div>Cargando...</div>; // Muestra algún indicador mientras se procesa la respuesta
};

export default GoogleAuthCallback;
