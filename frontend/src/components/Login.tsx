import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import axios from "axios";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", data);
      console.log("Login exitoso:", response.data);
      
      localStorage.setItem("token", response.data.token);

      navigate("/newsletter");  
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input {...register("email", { required: "El email es obligatorio" })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input type="password" {...register("password", { required: "La contraseña es obligatoria" })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;