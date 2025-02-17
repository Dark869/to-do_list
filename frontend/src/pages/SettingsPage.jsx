import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { userData } from "../utils/Api/userData.api.js";

function SettingsPage() {
  const [user, setUser] = useState({
    full_name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await userData();
        setUser(response.data);
      } catch {
        console.error("Error al cargar los datos del usuario");
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-zinc-800 min-h-screen">
      <NavBar />
      <h1 className="text-white flex justify-center text-3xl my-8">Ajustes</h1>
      <form className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 text-white w-3/4">
          <div className="grid grid-rows-1 justify-items-center my-3">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="full_name"
              className="bg-zinc-600 text-white rounded-lg w-3/4 py-1 px-3 my-2"
              value={user.full_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-rows-1 justify-items-center my-3">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              className="bg-zinc-600 text-white rounded-lg w-3/4 py-1 px-3 my-2"
              value={user.username || ""}
              readOnly
            />
          </div>
          <div className="grid grid-rows-1 justify-items-center my-3">
            <label>Correo</label>
            <input
              type="email"
              name="email"
              className="bg-zinc-600 text-white rounded-lg w-3/4 py-1 px-3 my-2"
              value={user.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-rows-1 justify-items-center my-2">
            <p className="text-blue-400 flex justify-center underline">
              <a href="#" className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                Cambiar contraseña
              </a>
            </p>
          </div>
          <div className="flex justify-center col-span-1 md:col-span-2 my-3">
            <input
              type="submit"
              value="Guardar"
              className="bg-blue-500 hover:bg-blue-700 transition delay-50 duration-300 text-white font-bold py-2 px-4 rounded-xl w-1/4"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
