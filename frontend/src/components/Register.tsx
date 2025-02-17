import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("Registro exitoso:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrarse</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nombre:</label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              {...register("email", { required: "El email es obligatorio" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Contraseña:</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirmar contraseña:</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">¿Ya tienes cuenta?</p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 text-blue-500 font-semibold hover:underline"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;