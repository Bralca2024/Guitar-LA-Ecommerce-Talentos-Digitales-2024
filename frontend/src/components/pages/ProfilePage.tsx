import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";



export default function ProfilePage() {
    
    const { userID } = useAuthStore(); // Obtén el userID del authStore
    const { getOneUser, selectedUser, loading } = useUserStore(); // Funciones y estado del userStore

    useEffect(() => {
        if (userID) {
            getOneUser(userID); // Obtén los datos del usuario
        }
    }, [userID, getOneUser]);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
            {selectedUser ? (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre:
                        </label>
                        <p>{selectedUser.fullName}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico:
                        </label>
                        <p>{selectedUser.email}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Dirección:
                        </label>
                        <p>{selectedUser.address || "No proporcionada"}</p>
                    </div>
                </div>
            ) : (
                <p>No se encontró información del usuario.</p>
            )}
        </div>
    );
}