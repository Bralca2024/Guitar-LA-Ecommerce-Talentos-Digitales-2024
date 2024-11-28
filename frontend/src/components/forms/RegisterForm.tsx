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
    console.log(baseUrl)
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const handleRegister = async (data: RegisterFormData) => {
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                const errorData = await response.text(); // Usamos .text() en lugar de .json() en caso de error 404 u otros
                console.error("Error del servidor:", errorData);
                throw new Error(errorData || "Error al registrar usuario");
            }
    
            const responseData = await response.json(); // Solo parsea como JSON si la respuesta es 200 OK
            alert("Usuario registrado con éxito");
            console.log(responseData)
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Hubo un problema al registrar el usuario");
        }
    };
    

    return (
        <div className="p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
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
            <textarea
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
