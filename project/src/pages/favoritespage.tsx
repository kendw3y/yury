import React, { useState } from 'react';
import { Eye, Heart } from 'lucide-react';

// Datos de categorías y productos (los mismos que en tu vista principal)
const mainCategories = [
  { id: 'ropa-textiles', name: 'Ropa y Textiles' },
  { id: 'bolsas-mochilas', name: 'Bolsas y Mochilas' },
  { id: 'botellas-bebidas', name: 'Botellas y Bebidas' },
  { id: 'tecnologia', name: 'Tecnología Personalizable' },
  { id: 'accesorios-personales', name: 'Accesorios Personales' },
  { id: 'tazas-vasos', name: 'Tazas y Vasos' },
  { id: 'oficina', name: 'Artículos de Oficina' },
  { id: 'papeleria', name: 'Papelería y Cuadernos' },
];

const products = [
  {
    id: 1,
    name: 'Bolsa Non-Woven JAZZIN',
    price: 'Consultar',
    category: 'bolsas-mochilas',
    image: '/bolsa-jazzin.png',
    description: 'Bolsa Non-Woven JAZZIN'
  },
  {
    id: 2,
    name: 'BOLSA-PROSUM1',
    price: 'Consultar',
    category: 'bolsas-mochilas',
    image: '/bolsa-prosum1.png',
    description: 'Bolsa PROSUM1'
  },
  {
    id: 3,
    name: 'Mochila Sublimación Lizcom',
    price: 'Consultar',
    category: 'bolsas-mochilas',
    image: '/mochila-lizcom.png',
    description: 'Mochila para sublimación Lizcom'
  },
  {
    id: 4,
    name: 'Polo Tecnic Plus - 100% Poliéster',
    price: 'Consultar',
    category: 'ropa-textiles',
    image: '/polo-tecnic-plus.png',
    description: 'Polo Tecnic Plus 100% poliéster'
  },
  {
    id: 5,
    name: 'Pullovers 150 gr. 100% Algodón',
    price: 'Consultar',
    category: 'ropa-textiles',
    image: '/pullovers-algodon.png',
    description: 'Pullovers 150 gr de algodón'
  },
  {
    id: 6,
    name: 'Neceser-KRESTON1',
    price: 'Consultar',
    category: 'accesorios-personales',
    image: '/neceser-kreston1.png',
    description: 'Neceser KRESTON1'
  },
  {
    id: 7,
    name: 'FUNDA-EKAIN2',
    price: 'Consultar',
    category: 'accesorios-personales',
    image: '/funda-ekain2.png',
    description: 'Funda EKAIN2'
  },
  {
    id: 8,
    name: 'Soporte Protok (Portacelular)',
    price: 'Consultar',
    category: 'tecnologia',
    image: '/soporte-protok.png',
    description: 'Soporte Protok para celular'
  },
  {
    id: 9,
    name: 'Bidón Deportivo (400 mL)',
    price: 'Consultar',
    category: 'botellas-bebidas',
    image: '/bidon-400ml.png',
    description: 'Bidón deportivo 400 mL'
  },
  {
    id: 10,
    name: 'Lunchera Coolcan – Capacidad 6 latas',
    price: 'Consultar',
    category: 'botellas-bebidas',
    image: '/lunchera-coolcan.png',
    description: 'Lunchera Coolcan para 6 latas'
  }
];

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

const FavoritesPage: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5, 8]); // Ejemplo con algunos favoritos

  // Filtrar solo los productos favoritos
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 0) + delta;
      return { ...prev, [id]: Math.max(0, newQty) };
    });
  };

  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, value) }));
  };

  const handleAddToCart = (id: number) => {
    const qty = quantities[id] || 1;
    console.log(`Agregar producto ${id} cantidad ${qty}`);
    setQuantities(prev => ({ ...prev, [id]: 0 }));
  };

  const handlePersonalize = (id: number) => {
    console.log(`Personalizar producto ${id}`);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeModal = () => setQuickViewProduct(null);

  return (
    <main className="min-h-screen bg-primary text-white font-nunito">
      {/* Encabezado */}
      <section className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Tus Productos Favoritos</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Aquí tienes todos los productos que has marcado como favoritos. Puedes personalizarlos o agregarlos directamente a tu carrito.
        </p>
      </section>

      {/* Resultados */}
      <section className="p-8">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No tienes productos favoritos aún</div>
            <button 
              className="bg-blue hover:bg-blue-700 px-6 py-3 rounded-lg transition"
              onClick={() => window.location.href = '/productos'}
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow relative"
              >
                {/* Indicador de favorito */}
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">
                  Favorito
                </div>

                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Botón para quitar de favoritos */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 transition"
                    title="Quitar de favoritos"
                  >
                    <Heart
                      className="h-4 w-4"
                      fill="white"
                      stroke="white"
                    />
                  </button>

                  {/* Vista rápida */}
                  <button
                    onClick={() => handleQuickView(product)}
                    className="absolute bottom-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> Vista rápida
                  </button>
                </div>

                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-300 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-accent mb-4">{product.price}</p>

                <div className="flex justify-between items-center">
                  <div className="flex border border-gray-600 rounded overflow-hidden">
                    <button
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      –
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={quantities[product.id] || 0}
                      onChange={e => handleInputChange(product.id, e)}
                      className="w-16 text-center bg-gray-800 text-white"
                    />
                    <button
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="bg-blue hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                    onClick={() => handlePersonalize(product.id)}
                  >
                    PERSONALIZAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de vista rápida */}
      {quickViewProduct && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-full">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <h3 className="text-2xl font-bold mb-2">{quickViewProduct.name}</h3>
              <p className="text-gray-300 mb-4">{quickViewProduct.description}</p>
              <p className="text-xl font-bold text-accent mb-6">{quickViewProduct.price}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex border border-gray-600 rounded overflow-hidden">
                  <button
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleQuantityChange(quickViewProduct.id, -1)}
                  >
                    –
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={quantities[quickViewProduct.id] || 0}
                    onChange={e => handleInputChange(quickViewProduct.id, e)}
                    className="w-16 text-center bg-gray-800 text-white"
                  />
                  <button
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleQuantityChange(quickViewProduct.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex-1"
                  onClick={() => {
                    handlePersonalize(quickViewProduct.id);
                    closeModal();
                  }}
                >
                  PERSONALIZAR PRODUCTO
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-semibold mb-2">Categoría:</h4>
                <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded">
                  {mainCategories.find(c => c.id === quickViewProduct.category)?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;