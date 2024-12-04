import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function UsersForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error al iniciar sesión");
      }

      const responseData = await response.json();  // Suponiendo que la respuesta tenga el token y el rol

      // Almacena el token y el rol en localStorage
      localStorage.setItem("token", responseData.token);  // Almacena el token
      localStorage.setItem("role", responseData.user.role);  // Almacena el rol
      navigate('/') //redirecciona al inicio luego de un inicio de sesion exitoso
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al iniciar sesión");
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
      <form onSubmit={handleSubmit(handleLogin)}>
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

        <button
          type="submit"
          className="w-full text-lg text-white bg-orange-600 font-bold uppercase py-2 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
