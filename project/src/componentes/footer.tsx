import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo y descripción */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <span className="text-black font-bold text-xl">CA</span>
            </div>
            <h3 className="text-xl font-bold">El Carro Amarillo</h3>
          </div>
          <p className="text-gray-400">
            Soluciones digitales innovadoras para tu negocio. Creamos experiencias que transforman.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <span className="material-icons">instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <span className="material-icons">twitter</span>
            </a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Inicio</a></li>
            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Productos</a></li>
            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Sobre Nosotros</a></li>
            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Contacto</a></li>
            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Información de contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Contacto</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="material-icons mr-3 text-yellow-400">place</span>
              <span className="text-gray-400">Calle 42 #1234, La Habana, Cuba</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-3 text-yellow-400">phone</span>
              <span className="text-gray-400">+53 5555 1234</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-3 text-yellow-400">email</span>
              <span className="text-gray-400">contacto@carroamarillo.com</span>
            </li>
          </ul>
        </div>

        {/* Boletín informativo */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Newsletter</h4>
          <p className="text-gray-400 mb-4">
            Suscríbete para recibir ofertas especiales y novedades.
          </p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Tu correo" 
              className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
            />
            <button 
              type="submit" 
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} El Carro Amarillo. Todos los derechos reservados.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-yellow-400 transition-colors">Términos de servicio</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;