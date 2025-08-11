import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <main className="min-h-screen bg-primary text-white font-nunito flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
