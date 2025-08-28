import { mainCategories } from "@/data/categorias";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {};

export const SiderBar = ({}: Props) => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [filterType, setFilterType] = useState<"todos" | "personalizables" | "no-personalizables">(
		"todos"
	);

	return (
		<>
			<button
				onClick={() => setSideMenuOpen(!sideMenuOpen)}
				className="text-2xl cursor-pointer text-white hover:text-accent transition-colors flex-shrink-0"
			>
				<Menu />
			</button>
			{sideMenuOpen && (
				<motion.nav
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: 0.3,
						delay: 0.3,
						ease: "easeInOut",
					}}
					className={`absolute top-0  left-0 w-80 text-white flex flex-col z-40 bg-gray-900 h-screen`}
				>
					<div className="p-2 flex justify-end ">
						<X onClick={() => setSideMenuOpen(!sideMenuOpen)} className="w-6 h-6 cursor-pointer" />
					</div>
					<div className="h-full scroll-container px-6">
						{/* Filtros */}
						<div className="mb-6">
							<h3 className="text-lg font-bold text-white mb-3">Filtrar por tipo</h3>
							<div className="flex flex-wrap gap-2">
								<button
									onClick={() => setFilterType("todos")}
									className={`px-3 py-1 rounded-full text-sm ${
										filterType === "todos"
											? "bg-accent text-white"
											: "bg-primary-dark text-gray-300 hover:bg-primary-darker"
									}`}
								>
									Todos
								</button>
								<button
									onClick={() => setFilterType("personalizables")}
									className={`px-3 py-1 rounded-full text-sm ${
										filterType === "personalizables"
											? "bg-pink text-white"
											: "bg-primary-dark text-gray-300 hover:bg-primary-darker"
									}`}
								>
									Personalizables
								</button>
								<button
									onClick={() => setFilterType("no-personalizables")}
									className={`px-3 py-1 rounded-full text-sm ${
										filterType === "no-personalizables"
											? "bg-yellow text-black"
											: "bg-primary-dark text-gray-300 hover:bg-primary-darker"
									}`}
								>
									No personalizables
								</button>
							</div>
						</div>
						{/* Categorías */}
						<ul className="list-none p-0">
							{mainCategories.map(category => (
								<li key={category.id} className="mb-6">
									<h3 className={`text-lg font-bold text-${category.color} mb-3`}>{category.name}</h3>
									<ul className="ml-4 text-base">
										{category.subcategories.map(item => (
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
				</motion.nav>
			)}
		</>
	);
};
