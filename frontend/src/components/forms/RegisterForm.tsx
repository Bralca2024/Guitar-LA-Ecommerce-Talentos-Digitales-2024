import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    fullName: string;
    dateOfBirth?: string;
    phone?: string;
    address?: string;
};

export default function RegisterForm() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const handleRegister = async (data: RegisterFormData) => {
    
        setMessage(null);

        const processedData = {
            ...data,
            dateOfBirth: data.dateOfBirth || null,
            phone: data.phone || null,
            address: data.address || null,
        };
    
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(processedData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
    
                if (response.status === 409) {
                    setMessage({ text: errorData.message, type: "error" });
                } else if (response.status === 400) {
                    setMessage({
                        text: errorData.details?.join("\n") || "Datos inválidos. Revisa los campos.",
                        type: "error",
                    });
                } else {
                    setMessage({ text: "Ocurrió un error inesperado. Intenta más tarde.", type: "error" });
                }
                return;
            }
    
            const responseData = await response.json();
            setMessage({ text: "Usuario registrado con éxito. Por favor, inicia sesión.", type: "success" });
            reset();
            console.log(responseData);
        } catch (error) {
            console.error("Error en el registro:", error);
            setMessage({ text: "Hubo un problema con la conexión. Por favor, revisa tu red.", type: "error" });
        }
};

    return (
        <div className="p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
            {message && (
                <div
                    className={`p-2 mb-4 rounded ${
                        message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Usuario
                    </label>
                    <input
                        id="username"
                        {...register("username", { required: "El nombre de usuario es obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                    {errors.username && (
                        <span className="text-red-500 text-sm">{errors.username.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Nombre completo
                    </label>
                    <input
                        id="fullName"
                        {...register("fullName", { required: "El nombre completo es obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                    {errors.fullName && (
                        <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "El correo es obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "La contraseña es obligatoria" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Fecha de nacimiento (opcional)
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono (opcional)
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Dirección (opcional)
                    </label>
                    <input
                        id="address"
                        {...register("address")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-lg text-white bg-orange-600 font-bold uppercase py-2 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}
