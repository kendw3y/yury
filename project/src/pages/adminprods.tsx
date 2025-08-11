import React, { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon, HeartIcon } from '@heroicons/react/24/outline';
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

const initialProducts = [
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

const AdminProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [modalProduct, setModalProduct] = useState<typeof initialProducts[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filterType, setFilterType] = useState<'todos' | 'personalizables' | 'no-personalizables'>('todos');
  const [isCreating, setIsCreating] = useState(false);
  const [imageHover, setImageHover] = useState(false);

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

  const handleView = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) handleOpenModal(product);
  };

  const handleEdit = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) handleOpenModal(product);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenModal = (product: typeof initialProducts[0]) => {
    setModalProduct(product);
    setIsCreating(false);
  };

  const handleCloseModal = () => {
    setModalProduct(null);
    setIsCreating(false);
    setImageHover(false);
  };

  const handleSave = () => {
    const name = (document.getElementById('edit-name') as HTMLDivElement)?.innerText;
    const description = (document.getElementById('edit-description') as HTMLDivElement)?.innerText;
    const price = (document.getElementById('edit-price') as HTMLDivElement)?.innerText;
    const categorySelect = document.getElementById('edit-category') as HTMLSelectElement;
    const category = categorySelect?.value;
  
    if (!name || !description || !price || !category) return;
  
    if (isCreating && modalProduct) {
      // Crear nuevo producto
      const newProduct = {
        ...modalProduct,
        id: Date.now(),
        name,
        description,
        price,
        category,
      };
      setProducts(prev => [...prev, newProduct]);
    } else if (modalProduct) {
      // Editar producto existente
      setProducts(prev =>
        prev.map(p =>
          p.id === modalProduct.id ? { ...p, name, description, price, category } : p
        )
      );
    }
  
    handleCloseModal();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && modalProduct) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setModalProduct({ ...modalProduct, image: imageUrl });
    }
  };

  return (
    <main className="min-h-screen bg-primary text-white font-nunito">
      <div><PromotionalBanner/></div>
      <h2 className="text-3xl font-bold mb-8 text-center p-4">Gestión de productos</h2>
      
      {/* Modal de edición/creación */}
      {modalProduct && (
        <div className="sticky top-0 w-full h-full z-50 bg-black bg-opacity-60 backdrop-blur-sm ">
          <div
            className="min-h-screen flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-scaleIn">
              <div 
                className="relative h-64 md:h-auto"
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
              >
                <img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="w-full h-full object-cover"
                />
                {imageHover && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <label className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                      Cambiar imagen
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition z-10"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div
                  id="edit-name"
                  contentEditable
                  suppressContentEditableWarning
                  className="text-2xl font-bold mb-4 border-b border-transparent focus:border-blue-500 focus:outline-none min-h-[2rem]"
                  data-placeholder="Nombre del producto"
                  style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.1)' }}
                >
                  {modalProduct.name}
                </div>
                <div
                  id="edit-description"
                  contentEditable
                  suppressContentEditableWarning
                  className="text-gray-700 mb-4 border-b border-transparent focus:border-blue-500 focus:outline-none min-h-[2rem]"
                  data-placeholder="Descripción del producto"
                  style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.1)' }}
                >
                  {modalProduct.description}
                </div>
                <div
                  id="edit-price"
                  contentEditable
                  suppressContentEditableWarning
                  className="text-xl font-bold text-blue-600 mb-6 border-b border-transparent focus:border-blue-500 focus:outline-none min-h-[2rem]"
                  data-placeholder="Precio del producto"
                  style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.1)' }}
                >
                  {modalProduct.price}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Categoría:</label>
                  <select
                    id="edit-category"
                    defaultValue={modalProduct.category}
                    className="w-full p-2 border rounded shadow-sm"
                  >
                    {mainCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
                >
                  {isCreating ? 'Crear producto' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Filtros de búsqueda */}
      <section className="p-4 bg-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:flex-1 p-3 rounded-lg bg-gray-700 text-white"
          />
          <select
            value={selectedCategory || ''}
            onChange={e => setSelectedCategory(e.target.value || null)}
            className="w-full md:w-64 p-3 rounded-lg bg-gray-700 text-white"
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
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'todos' ? 'bg-blue' : 'bg-gray-700'}`}
        >
          Todos los productos
        </button>

        <button
          onClick={() => {
            setFilterType('personalizables');
            setSelectedCategory(null);
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'personalizables' ? 'bg-blue' : 'bg-gray-700'}`}
        >
          Personalizables
        </button>

        <button
          onClick={() => {
            setFilterType('no-personalizables');
            setSelectedCategory(null);
          }}
          className={`px-4 py-2 rounded-lg ${filterType === 'no-personalizables' ? 'bg-blue' : 'bg-gray-700'}`}
        >
          No personalizables
        </button>
      </section>

      {/* Resultados */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {selectedCategory
            ? mainCategories.find(c => c.id === selectedCategory)?.name
            : 'Todos los productos'}
          {searchTerm && ` – Resultados para "${searchTerm}"`}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Botón para crear nuevo producto */}
          <div
            className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => {
              setModalProduct({
                id: Date.now(),
                name: '',
                description: '',
                price: '',
                category: mainCategories[0].id,
                image: '/placeholder.png',
              });
              setIsCreating(true);
            }}
          >
            <div className="aspect-square w-full flex items-center justify-center rounded-lg mb-4 border-2 border-dashed border-gray-600 group-hover:border-blue-500">
              <span className="text-6xl text-gray-500 group-hover:text-blue-500">+</span>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-400 group-hover:text-white">
              Crear nuevo producto
            </h3>
          </div>

          {filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg p-4 shadow-lg group relative">
              {/* Favoritos (solo visual en admin) */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-2 right-2 z-20 ${
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

              <div className="relative aspect-square overflow-hidden rounded-lg mb-4 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => handleOpenModal(product)}
                  className="absolute bottom-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> Vista rápida
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-300 mb-3">{product.description}</p>
              <p className="text-lg font-bold text-accent mb-4">{product.price}</p>
              
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleView(product.id)} title="Ver producto">
                  <EyeIcon className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                </button>
                <button onClick={() => handleEdit(product.id)} title="Editar producto">
                  <PencilIcon className="w-6 h-6 text-yellow-400 hover:text-yellow-600" />
                </button>
                <button onClick={() => handleDelete(product.id)} title="Eliminar producto">
                  <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </section>

    </main>
  );
};

export default AdminProductsPage;