import React, { useState } from 'react';
import { Eye, Heart } from 'lucide-react';
import PromotionalBanner from '../componentes/banerpromocional';

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
  // 🎒 Bolsas y Mochilas
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

  // 👕 Ropa y Textiles
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

  // 🕶️ Accesorios Personales
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

  // 💻 Tecnología Personalizable
  {
    id: 8,
    name: 'Soporte Protok (Portacelular)',
    price: 'Consultar',
    category: 'tecnologia',
    image: '/soporte-protok.png',
    description: 'Soporte Protok para celular'
  },

  // 🧴 Botellas y Bebidas
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

const UserProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false); // Nuevo estado para mostrar favoritos

  // Nuevo estado para el filtro principal
  const [filterType, setFilterType] = useState<'todos' | 'personalizables' | 'no-personalizables'>('todos');

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const personalizableCategories = mainCategories.map(cat => cat.id);

  const filteredProducts = products
    .filter(p => {
      if (filterType === 'todos') return true;
      if (filterType === 'personalizables') return personalizableCategories.includes(p.category);
      if (filterType === 'no-personalizables') return !personalizableCategories.includes(p.category);
      return true;
    })
    .filter(p =>
      !selectedCategory || p.category === selectedCategory
    )
    .filter(p =>
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

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

  const handleQuickView = (product: typeof products[0]) => {
    setQuickViewProduct(product);
  };

  const closeModal = () => setQuickViewProduct(null);
  const resetFilters = () => setSelectedCategory(null);

  return (
    <main className="min-h-screen bg-primary text-white font-nunito">
      <div><PromotionalBanner/></div>
      <section className="p-4 bg-gray-800">
        <div className="max-w-4xl mx-auto md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full my-2 md:flex-1 p-3 rounded-lg bg-gray-700 text-white"
          />
          <select
            value={selectedCategory || ''}
            onChange={e => setSelectedCategory(e.target.value || null)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          >
            <option value="">Todas las subcategorías</option>
            {mainCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Filtros principales */}
      <section className="p-4 bg-gray-800 flex justify-center gap-4 flex-wrap sticky top-0 z-10">
        <button
          onClick={() => {
            setFilterType('todos');
            setSelectedCategory(null);
            setShowFavorites(false);
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'todos' && !showFavorites ? 'bg-blue' : 'bg-gray-700'}`}
        >
          Todos los productos
        </button>

        <button
          onClick={() => {
            setFilterType('personalizables');
            setSelectedCategory(null);
            setShowFavorites(false);
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'personalizables' && !showFavorites ? 'bg-blue' : 'bg-gray-700'}`}
        >
          Personalizables
        </button>

        <button
          onClick={() => {
            setFilterType('no-personalizables');
            setSelectedCategory(null);
            setShowFavorites(false);
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'no-personalizables' && !showFavorites ? 'bg-blue' : 'bg-gray-700'}`}
        >
          No personalizables
        </button>

        {/* Botón para mostrar favoritos */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${showFavorites ? 'bg-blue' : 'bg-gray-700'}`}
        >
          <Heart 
            className="h-5 w-5" 
            fill={showFavorites ? 'white' : 'none'} 
            stroke="white" 
          />
          Favoritos ({favorites.length})
        </button>
      </section>

      {/* Resultados */}
      <section className="p-8">
        {showFavorites ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">
              Mis Favoritos
            </h2>
            
            {favoriteProducts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                No tienes productos favoritos aún
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg group">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute top-2 right-2 ${
                          favorites.includes(product.id) ? 'bg-red-600' : 'bg-white'
                        } text-white rounded-full p-2 transition`}
                        title={
                          favorites.includes(product.id)
                            ? 'Quitar de favoritos'
                            : 'Añadir a favoritos'
                        }
                      >
                        <Heart
                          className="h-4 w-4 stroke-red-700"
                          fill={favorites.includes(product.id) ? 'white' : 'none'}
                          stroke="white"
                        />
                      </button>

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
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">
              {selectedCategory
                ? mainCategories.find(c => c.id === selectedCategory)?.name
                : 'Todos los productos'}
              {searchTerm && ` – Resultados para "${searchTerm}"`}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                No se encontraron productos con esos filtros
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg group">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute top-2 right-2 ${
                          favorites.includes(product.id) ? 'bg-red-600' : 'bg-white'
                        } text-white rounded-full p-2 transition`}
                        title={
                          favorites.includes(product.id)
                            ? 'Quitar de favoritos'
                            : 'Añadir a favoritos'
                        }
                      >
                        <Heart
                          className="h-4 w-4 stroke-red-700"
                          fill={favorites.includes(product.id) ? 'white' : 'none'}
                          stroke="white"
                        />
                      </button>

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
          </>
        )}
      </section>

      {/* Modal de vista rápida */}
      {quickViewProduct && (
        <div
          className="sticky top-0 h-screen inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
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

export default UserProductsPage;