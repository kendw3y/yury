import { Menu, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [filterType, setFilterType] = useState<'todos' | 'personalizables' | 'no-personalizables'>('todos');

  const mainCategories = [
    { id: 'ropa-textiles', name: 'Ropa y Textiles', color: 'accent' },
    { id: 'bolsas-mochilas', name: 'Bolsas y Mochilas', color: 'accent' },
    { id: 'botellas-bebidas', name: 'Botellas y Bebidas', color: 'yellow' },
    { id: 'tecnologia', name: 'Tecnología Personalizable', color: 'pink' },
    { id: 'accesorios-personales', name: 'Accesorios Personales', color: 'pink' },
    { id: 'tazas-vasos', name: 'Tazas y Vasos', color: 'yellow' },
    { id: 'oficina', name: 'Artículos de Oficina', color: 'accent' },
    { id: 'papeleria', name: 'Papelería y Cuadernos', color: 'accent' },
  ];

  const getSubcategories = (categoryId: string): string[] => {
    const subcategories: Record<string, string[]> = {
      'ropa-textiles': ['Camisetas', 'Sudaderas', 'Gorras', 'Bolsos tela'],
      'bolsas-mochilas': ['Mochilas', 'Bolsas tela', 'Bolsas algodón'],
      'botellas-bebidas': ['Botellas agua', 'Termos', 'Vasos térmicos'],
      'tecnologia': ['Fundas móvil', 'Power banks', 'Pulseras inteligentes'],
      'accesorios-personales': ['Llaveros', 'Gafas sol', 'Gorras'],
      'tazas-vasos': ['Tazas cerámica', 'Vasos impresos', 'Juegos de tazas'],
      'oficina': ['Agendas', 'Bolígrafos', 'Soportes móvil'],
      'papeleria': ['Cuadernos', 'Postales', 'Notas adhesivas']
    };
    return subcategories[categoryId] || [];
  };

  return (
    <>
      {/* Barra superior (se mantiene igual) */}
      <header className="flex justify-between items-center px-4 py-3 bg-primary relative z-50 h-20 min-h-[5rem]">
        <button 
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
          className="text-2xl cursor-pointer text-white hover:text-accent transition-colors flex-shrink-0"
        >
          <Menu />
        </button>

        <div className="flex items-center justify-center flex-1 mx-4 min-w-0">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-3 flex-shrink-0" />
            <div className="text-center min-w-0">
              <h1 className="text-xl md:text-2xl font-bold m-0 leading-tight">YURY <span className="text-base md:text-lg font-medium">impresiones</span></h1>
              <p className="text-xs md:text-sm m-0 text-gray-300 leading-tight">De tu sueño a la realidad</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to={"/login"} className="bg-blue hover:bg-blue-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm flex items-center">
            <User className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Entrar</span>
          </Link>
          <button className="bg-blue hover:bg-blue-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm hidden lg:block">
            Contactos
          </button>
          <button className="bg-pink hover:bg-pink-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm hidden sm:flex items-center">
            <Heart className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Favoritos</span>
          </button>
          <button className="bg-yellow hover:bg-yellow-dark text-black border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm flex items-center">
            <ShoppingCart className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Carrito</span>
          </button>
        </div>
      </header>

      {/* Menú lateral actualizado */}
      <nav className={`absolute left-0 w-80 transform transition-transform duration-300 ease-in-out z-40 ${
        sideMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl bg-primary`} style={{ height: 'calc(100vh - 5rem)' }}>
        <div className="h-full overflow-y-auto p-6">
          {/* Filtros */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Filtrar por tipo</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType('todos')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterType === 'todos' 
                    ? 'bg-accent text-white' 
                    : 'bg-primary-dark text-gray-300 hover:bg-primary-darker'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('personalizables')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterType === 'personalizables'
                    ? 'bg-pink text-white'
                    : 'bg-primary-dark text-gray-300 hover:bg-primary-darker'
                }`}
              >
                Personalizables
              </button>
              <button
                onClick={() => setFilterType('no-personalizables')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterType === 'no-personalizables'
                    ? 'bg-yellow text-black'
                    : 'bg-primary-dark text-gray-300 hover:bg-primary-darker'
                }`}
              >
                No personalizables
              </button>
            </div>
          </div>

          {/* Categorías */}
          <ul className="list-none p-0">
            {mainCategories.map((category) => (
              <li key={category.id} className="mb-6">
                <h3 className={`text-lg font-bold text-${category.color} mb-3`}>
                  {category.name}
                </h3>
                <ul className="ml-4 text-base">
                  {getSubcategories(category.id).map((item) => (
                    <li 
                      key={item} 
                      className={`mb-2 cursor-pointer hover:text-${category.color} transition-colors`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {sideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          style={{ top: '5rem' }}
          onClick={() => setSideMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;