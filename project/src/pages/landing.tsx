import React from 'react';
import { Link } from 'react-router-dom';
import PromotionalBanner from '../componentes/banerpromocional';

const Landing: React.FC = () => {
  
  const products = [
    {
      id: 1,
      name: 'Pulóver',
      price: '$15.60',
      image: '/PULOVERGENERICO.png',
      description: 'Personaliza tu Pulóver'
    },
    {
      id: 2,
      name: 'Taza',
      price: '$15.60',
      image: '/TAZAGENERICA.jpg',
      description: 'Personaliza tu Taza'
    },
    {
      id: 3,
      name: 'Gorra',
      price: '$15.60',
      image: '/GORRAGENERICA.jpg',
      description: 'Personaliza tu Gorra'
    },
    {
      id: 4,
      name: 'Mousepad',
      price: '$15.60',
      image: '/MOUSEPADGENERICO.jpg',
      description: 'Personaliza tu Mousepad'
    }
  ];


  const goToCategory = (category: string) => {
    // Lógica para navegar a la categoría seleccionada
    console.log(`Navegando a la categoría: ${category}`);
    // Aquí podrías usar react-router-dom o tu método de navegación preferido
  };

  return (
    <main className="min-h-screen bg-primary text-white font-nunito">
    <div><PromotionalBanner/></div>

      {/* Sección de Categorías */}
      <section className="flex flex-col lg:flex-row gap-4 p-4 lg:h-80">
  {/* Categoría 1 - Artículos Promocionales */}
  <div 
    className="flex-1 bg-blue hover:bg-blue-dark cursor-pointer relative overflow-hidden group transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10"
    onClick={() => goToCategory('promocionales')}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
    <div className="relative h-full flex items-center justify-center p-6">
      <div className="text-center text-white transition-all duration-500 group-hover:scale-105">
        <h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-3xl group-hover:mb-4">
          Artículos Promocionales
        </h3>
        <p className="text-lg opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:text-xl">
          Pulóveres, Tazas, Gorras y más
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          <Link to="productos" className="px-6 py-2 bg-white text-blue-800 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
  </div>

  {/* Categoría 2 - Material de Oficina */}
  <div 
    className="flex-1 bg-pink hover:bg-pink-dark cursor-pointer relative overflow-hidden group transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10"
    onClick={() => goToCategory('oficina')}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-800 opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
    <div className="relative h-full flex items-center justify-center p-6">
      <div className="text-center text-white transition-all duration-500 group-hover:scale-105">
        <h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-3xl group-hover:mb-4">
          Material de Oficina
        </h3>
        <p className="text-lg opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:text-xl">
          Modelos, Facturas, Bolígrafos
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          <Link to="productos" className="px-6 py-2 bg-white text-pink-800 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
  </div>

  {/* Categoría 3 - Artículos Varios */}
  <div 
    className="flex-1 bg-yellow hover:bg-yellow-dark cursor-pointer relative overflow-hidden group transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10"
    onClick={() => goToCategory('varios')}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
    <div className="relative h-full flex items-center justify-center p-6">
      <div className="text-center  transition-all duration-500 group-hover:scale-105">
        <h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-3xl group-hover:mb-4">
          Artículos Varios
        </h3>
        <p className="text-lg opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:text-xl">
          Pisapapeles, Identificaciones y más
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          <Link to="productos" className="px-6 py-2 bg-white text-yellow-800 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
  </div>
</section>
      {/* Sección de productos */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Personalizables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

// Componente auxiliar para tarjetas de producto
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 group">
    <div className="aspect-square overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors">
        ¡Personaliza ya!
      </button>
    </div>
  </div>
);

export default Landing;