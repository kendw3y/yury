import { useProduct } from "@/modules/admin/hooks/useProducts";
import type { Producto } from "../interfaces/interfaces";
import { Heart, X } from "lucide-react";
import { CoustomButton } from "@/components";
import { mainCategories } from "@/data/categorias";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCar } from "@/hooks/useShoppingCar";
import type { Product } from "../interfaces/interfaces";

type Props = {
	product: Producto;
};

export const ProductCard = ({ product }: Props) => {
	const { updateProductMutation } = useProduct();
	const { addProductToCartMutation } = useShoppingCar();
	const [quantityState, setQuantityState] = useState<number>(product.quantity ?? 0);
	const [view, setView] = useState(false);
	const navigate = useNavigate();

	const handlePersonalizar = () => {
		navigate(`/personalizar?productId=${product.id}`);
	};

	// Función para convertir Producto a Product (formato del carrito)
	const convertToCartProduct = (producto: Producto): Product => {
		return {
			id: producto.id,
			name: producto.name,
			price: typeof producto.price === "string" ? parseFloat(producto.price) || 0 : producto.price,
			image: producto.image,
			color: "Sin especificar", // Valor por defecto
			quantity: quantityState || 1
		};
	};

	const handleAddToCart = () => {
		const cartProduct = convertToCartProduct(product);
		addProductToCartMutation.mutate(cartProduct);
	};

	return (
		<>
			<div
				key={product.id}
				className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
			>
				<div className="flex flex-col gap-4">
					<div className="relative aspect-square  overflow-hidden rounded-lg group">
						<img
							onClick={() => setView(true)}
							src={product.image}
							alt={product.name}
							className="w-full h-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<button onClick={() => {}} className={`absolute top-2 right-2   rounded-full p-1 transition`}>
							<Heart
								fillRule="nonzero"
								fill={product.favorite === true ? "oklch(70.4% 0.191 22.216)" : "#1d1a1a44"}
								onClick={() =>
									updateProductMutation.mutate({
										...product,
										favorite: product.favorite === true ? false : true,
									})
								}
								className={` ${product.favorite === true ? "text-red-400" : ""}`}
								stroke="white"
							/>
						</button>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-xl font-bold">{product.name}</h3>
						<p className="text-gray-300 ">{product.description}</p>
						<p className="text-lg font-bold text-accent ">CUP {product.price}</p>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<div className="flex ">
							<button
								className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-l-lg cursor-pointer"
								onClick={() => setQuantityState(prev => (prev === 0 ? 0 : prev - 1))}
							>
								–
							</button>
							<div className="w-10 flex justify-center items-center border-t border-b border-gray-700 focus:border-gray-600  text-white">
								{quantityState}
							</div>
							<button
								className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-r-lg cursor-pointer"
								onClick={() => setQuantityState(prev => prev + 1)}
							>
								+
							</button>
						</div>
					</div>
					
					<div className="flex justify-between  ">
						<CoustomButton
							colorButton="#1c398e"
							hoverColor="#335BC6"
							tittleButton="Personalizar"
							handleOnClick={handlePersonalizar}
						></CoustomButton>
						
						<CoustomButton
							colorButton="#1c398e"
							hoverColor="#335BC6"
							tittleButton="Agregar al carrito"
							handleOnClick={handleAddToCart}
						></CoustomButton>
					</div>
				</div>
			</div>
			{view && (
				<div className="fixed top-0 h-screen inset-0 z-50 bg-black/10  backdrop-blur-sm flex items-center justify-center ">
					<div
						className="bg-gray-800 rounded-xl shado w-[330px] sm:w-2xl  md:w-3xl max-w-4xl max-h-[90vh] overflow-hidden grid grid-cols-1 sm:grid-cols-2 animate-fadeIn scroll-container"
						onClick={e => e.stopPropagation()}
					>
						<div className="relative h-[334px] sm:h-full">
							<img src={product.image} alt={product.name} className="w-full h-full object-cover" />
							<X
								onClick={() => setView(false)}
								className="absolute top-2 right-2  text-gray-600  rounded-full cursor-pointer"
							></X>
						</div>
						<div className="p-6 flex flex-col  overflow-y-auto">
							<h3 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h3>
							<p className="text-gray-300 mb-4">{product.description}</p>
							<p className="text-xl font-bold text-accent mb-6">CUP {product.price}</p>

							<div className="flex justify-between mb-4">
								<div className="flex ">
									<button
										className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-l-lg cursor-pointer"
										onClick={() => setQuantityState(prev => (prev === 0 ? 0 : prev - 1))}
									>
										–
									</button>
									<div className="w-10 flex justify-center items-center border-t border-b border-gray-700 focus:border-gray-600  text-white">
										{quantityState}
									</div>
									<button
										className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-r-lg cursor-pointer"
										onClick={() => setQuantityState(prev => prev + 1)}
									>
										+
									</button>
								</div>
							</div>

							<div className="w-full flex justify-between  ">
								<CoustomButton
									colorButton="#1c398e"
									hoverColor="#335BC6"
									tittleButton="Personalizar"
									handleOnClick={handlePersonalizar}
								></CoustomButton>
								
								<CoustomButton
									colorButton="#1c398e"
									hoverColor="#335BC6"
									tittleButton="Agregar al carrito"
									handleOnClick={handleAddToCart}
								></CoustomButton>
							</div>

							<div className="border-t border-gray-700 pt-4 mt-4">
								<h4 className="font-semibold mb-2">Categoría:</h4>
								<span className="bg-blue-900 text-white text-xs px-2 py-1 rounded">
									{mainCategories.find(c => c.id === product.category)?.name}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
