import { Heart, ShoppingCart, User, Phone, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "@/modules/admin/hooks/useProducts";
import { mainCategories } from "@/data/categorias";

const Header: React.FC = () => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
	const { products } = useProduct();
	const favoritos = products.filter(p => p.favorite === true).length;

	const toggleCategory = (categoryId: string) => {
		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
	};

	return (
		<>
			{/* Barra superior */}
			<header className="flex text-white justify-between items-center w-full px-4 shadow-md py-3 bg-gray-900 fixed z-10 min-h-[5rem]">
				<div className="flex gap-8 items-center">
					{/* Botón menú hamburguesa */}
					<button
						onClick={() => setSideMenuOpen(!sideMenuOpen)}
						className="hover:bg-white/5 text-white border-none rounded-lg p-2 cursor-pointer transition-colors font-medium"
					>
						<Menu className="h-6 w-6" />
					</button>

					<Link to={"/"} className="cursor-pointer">
						<div className="flex items-center">
							<img src="assets/logo.png" alt="Logo" className="h-10 w-10 mr-3 flex-shrink-0" />
							<div className="text-center min-w-0">
								<h1 className="text-xl md:text-2xl font-bold m-0 leading-tight">
									YURY <span className="text-base md:text-lg font-medium">impresiones</span>
								</h1>
								<p className="text-xs md:text-sm m-0 text-gray-300 leading-tight">
									De tu sueño a la realidad
								</p>
							</div>
						</div>
					</Link>
				</div>
				<div className="flex items-center gap-2 flex-shrink-0">
					<Link
						to={"/login"}
						className=" hover:bg-white/5  gap-2  text-white border-none rounded-lg sm:px-3 py-2 cursor-pointer transition-colors ease-in-out font-medium text-xs md:text-sm flex items-center"
					>
						<User className="h-5 w-5 " /> <span className="hidden sm:inline ">Entrar</span>
					</Link>
					<button className="hover:bg-white/5 text-white border-none rounded-lg sm:px-3 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm  lg:block">
						<Link className="flex gap-2" to={""}>
              <Phone className="h-5 w-5 "/> <span className="hidden sm:inline">Contactos</span>
            </Link>
					</button>
					<button className="hover:bg-white/5 text-white border-none rounded-lg sm:px-3 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm  sm:flex items-center">
						<Link className="flex gap-2" to={"favorite"}>
							<div className="flex relative">
								<Heart fill={favoritos > 0 ? "#fff" : '#101828'} className="h-5 w-5 " />
								{favoritos > 0 && <span className="text-xs self-start absolute text-gray-900 top-[2px] font-bold left-0 bottom-0 right-0">{favoritos}</span>}
							</div>{" "}
							<span className="hidden sm:inline">Favoritos</span>
						</Link>
					</button>
					<button className="hover:bg-white/5 text-white border-none rounded-lg sm:px-3 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm flex items-center">
						<Link to={"shoppingcar"} className="flex gap-2">
							<ShoppingCart className="h-5 w-5 " /> <span className="hidden sm:inline">Carrito</span>
						</Link>
					</button>
				</div>
			</header>

			{/* Menú lateral desplegable */}
			<div className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white z-50 transform transition-transform duration-300 overflow-y-auto ${
				sideMenuOpen ? 'translate-x-0' : '-translate-x-full'
			}`}>
				{/* Header del menú */}
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-bold">Catálogo de Productos</h2>
					<button
						onClick={() => setSideMenuOpen(false)}
						className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				{/* Lista de categorías */}
				<div className="p-4">
					<Link
						to="/products"
						onClick={() => setSideMenuOpen(false)}
						className="block w-full text-left p-3 mb-2 bg-blue hover:bg-blue/80 rounded-lg font-medium transition-colors"
					>
						Ver Todos los Productos
					</Link>

					{mainCategories.map((category) => (
						<div key={category.id} className="mb-2">
							<button
								onClick={() => toggleCategory(category.id)}
								className="flex items-center justify-between w-full p-3 hover:bg-gray-700 rounded-lg transition-colors text-left"
							>
								<span className="font-medium">{category.name}</span>
								{expandedCategory === category.id ? (
									<ChevronDown className="h-5 w-5" />
								) : (
									<ChevronRight className="h-5 w-5" />
								)}
							</button>

							{/* Subcategorías */}
							{expandedCategory === category.id && (
								<div className="ml-4 mt-2 space-y-1">
									{category.subcategories.map((subcategory, index) => (
										<Link
											key={index}
											to={`/products?category=${category.id}&subcategory=${subcategory}`}
											onClick={() => setSideMenuOpen(false)}
											className="block p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors text-sm"
										>
											{subcategory}
										</Link>
									))}
								</div>
							)}
						</div>
					))}
				</div>

				{/* Enlaces adicionales */}
				<div className="border-t border-gray-700 p-4 mt-auto">
					<Link
						to="/personalizar"
						onClick={() => setSideMenuOpen(false)}
						className="block p-3 mb-2 bg-pink hover:bg-pink/80 rounded-lg font-medium transition-colors text-center"
					>
						Personalizar Productos
					</Link>
					<Link
						to="/favorite"
						onClick={() => setSideMenuOpen(false)}
						className="block p-3 mb-2 bg-yellow text-gray-900 hover:bg-yellow/80 rounded-lg font-medium transition-colors text-center"
					>
						Mis Favoritos
					</Link>
				</div>
			</div>

		</>
	);
};

export default Header;
