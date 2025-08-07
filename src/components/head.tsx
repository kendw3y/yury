import { Menu, Search, Heart, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			{/* Barra superior */}
			<header className="flex justify-between shadow-lg bg-gray-900 w-full items-center px-4 py-3 bg-primary fixed z-10 h-20 min-h-[5rem]">
				<div className="flex gap-6">
					<button
						onClick={() => setSideMenuOpen(!sideMenuOpen)}
						className="text-2xl cursor-pointer text-white hover:text-accent transition-colors flex-shrink-0"
					>
						<Menu />
					</button>
					<div className="flex items-center justify-center   ">
						<div onClick={() => navigate("/gestion_user")} className="flex items-center cursor-pointer">
							<img src="/assets/logo.png" alt="Logo" className="h-10 w-10  flex-shrink-0" />
							<div className="text-center min-w-0 text-white">
								<h1 className="text-xl md:text-2xl font-bold  leading-tight">
									YURY <span className="text-base md:text-lg font-medium">impresiones</span>
								</h1>
								<p className="text-xs md:text-sm  text-gray-300 leading-tight">De tu sueño a la realidad</p>
							</div>
						</div>
					</div>
				</div>
				<div className="justify-self-end  flex items-center gap-2 ">
					<div className="relative hidden lg:inline-block">
						<input
							type="text"
							placeholder="Buscar productos..."
							className="px-3 py-2 rounded-lg border-none bg-white text-black placeholder-gray-500 w-48 xl:w-64 text-sm"
						/>
						<Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
					</div>
					<button  onClick={() => navigate("/login")} className="bg-blue hover:bg-blue-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm hidden md:flex items-center">
						<User className="h-4 w-4 " /> Entrar
					</button>
					<button className="bg-blue hover:bg-blue-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm hidden lg:block">
						Contactos
					</button>
					<button className="bg-pink hover:bg-pink-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm flex items-center">
						<Heart className="h-4 w-4 " /> <span className="hidden sm:inline">Favoritos</span>
					</button>
					<button
						onClick={() => navigate("/shoppingcar")}
						className="bg-yellow hover:bg-yellow-dark text-white border-none rounded-lg px-2 py-2 cursor-pointer transition-colors font-medium text-xs md:text-sm flex items-center"
					>
						<ShoppingCart className="h-4 w-4 " /> <span className="hidden sm:inline">Carrito</span>
					</button>
				</div>
			</header>
		</>
	);
};

export default Header;
