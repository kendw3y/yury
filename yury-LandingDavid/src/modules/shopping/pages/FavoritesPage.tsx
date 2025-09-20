import { useProduct } from "@/modules/admin/hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
  const navigate = useNavigate()
	const { products } = useProduct();
	const favoriteProducts = products.filter(p => p.favorite === true);
	return (
		<main className="min-h-screen bg-primary text-white font-nunito">
			{/* Encabezado */}
			<section className="p-4 text-center">
				<h1 className="text-4xl font-bold mb-1">Tus Productos Favoritos</h1>
				<p className="text-gray-300 max-w-2xl mx-auto">
					Aquí tienes todos los productos que has marcado como favoritos. Puedes personalizarlos o
					agregarlos directamente a tu carrito.
				</p>
			</section>

			<section className="px-8">
				{favoriteProducts.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-gray-400 text-xl mb-4">No tienes productos favoritos aún</div>
						<button
							className="bg-blue hover:bg-blue-700 px-6 py-3 rounded-lg transition"
							onClick={() => navigate('/products')}
						>
							Explorar Productos
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{favoriteProducts.map(product => (
							<ProductCard product={product} key={product.id} />
						))}
					</div>
				)}
			</section>
		</main>
	);
};

export default FavoritesPage;
