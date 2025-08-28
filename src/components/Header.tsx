import { Menu, Search, Heart, ShoppingCart, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "@/modules/admin/hooks/useProducts";

const Header: React.FC = () => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const { products } = useProduct();
	const favoritos = products.filter(p => p.favorite === true).length;
	return (
		<>
			{/* Barra superior (se mantiene igual) */}
			<header className="flex text-white justify-between items-center w-full px-4 shadow-md py-3 bg-gray-900 fixed z-10  min-h-[5rem]">
				<div className="flex gap-8">
					
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

			{/* Overlay */}
			{sideMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30"
					style={{ top: "5rem" }}
					onClick={() => setSideMenuOpen(false)}
				/>
			)}
		</>
	);
};

export default Header;
