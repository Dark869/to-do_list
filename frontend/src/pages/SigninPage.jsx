import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

import { signin } from "../utils/Api/auth.api.js";
import HeaderNoProtectedPages from "../components/HeaderNoProtectedPages";

function SigninPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signin(data);
    if (result) {
      navigate("/");
    } else {
      console.error("Error al iniciar sesión");
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen">
      <HeaderNoProtectedPages />
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 bg-neutral-900/70 rounded-3xl flex fixed flex-col items-center p-6 sm:p-8 content-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl sm:text-3xl text-white my-4 sm:my-6 text-center">
            Inicio de sesión
          </h1>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="username"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="password"
          />
          <button
            id="signinButton"
            className="p-3 my-2 flex justify-center mx-auto rounded-xl bg-primary-500 font-medium transition duration-300 ease-in-out hover:bg-primary-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            Iniciar sesión
          </button>
          <p className="text-white flex justify-center py-4">
            ¿Aún no tienes cuenta?
            <Link
              to="/signup"
              className="ml-1 text-primary-400 hover:underline text-blue-400"
            >
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
