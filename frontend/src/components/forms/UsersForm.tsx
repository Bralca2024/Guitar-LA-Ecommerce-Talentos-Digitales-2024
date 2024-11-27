import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function UsersForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

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
          className="w-full text-lg text-white bg-orange-700 font-bold uppercase py-2 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300"
        
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
