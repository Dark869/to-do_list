import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react';

import HeaderNoProtectedPages from '../components/HeaderNoProtectedPages';
import { signup } from '../utils/Api/auth.api';

function SigninPage() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
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
    const response = await signup(data);
    if (response) {
      navigate('/signin');
    } else {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen">
      <HeaderNoProtectedPages />
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 bg-neutral-900/70 rounded-3xl flex flex-col items-center p-6 sm:p-8 mx-auto mt-20">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl sm:text-3xl text-white my-4 sm:my-6 text-center">
            Registro
          </h1>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="username"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="email"
          />
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="full_name"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
            name="password"
          />
          <div className='py-2'>
            <p className='text-neutral-400'>Debe tener al menos 8 caracteres</p>
            <p className='text-neutral-400'>Debe tener al menos un número</p>
            <p className='text-neutral-400'>Debe tener al menos una letra mayúscula</p>
            <p className='text-neutral-400'>Debe tener al menos un simbolo especial</p>
          </div>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full p-2 my-2 rounded-lg bg-neutral-800 text-white"
            onChange={handleChange}
          />
          <div className='py-2'>
            <p className='text-neutral-400'>asd</p>
          </div>
          <button
            id="signinButton"
            className="p-3 my-2 flex justify-center mx-auto rounded-xl bg-primary-500 font-medium transition duration-300 ease-in-out hover:bg-primary-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            Registrarse
          </button>
          <p className="text-white flex justify-center py-4">
            ¿Ya tienes cuenta?
            <Link
              to="/signin"
              className="ml-1 text-primary-400 hover:underline text-blue-400"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;