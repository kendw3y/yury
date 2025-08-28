import { genericProduct } from "@/data/productosGenericos";
import { ProductCardLandingPage } from "../components/ProductCardLandingPage";
import { CategoryCard } from "../components/CategoryCard";
import PromotionalBanner from "../components/BanerPromocional";

export const Landing = () => {
	const goToCategory = (category: string) => {
		console.log(`Navegando a la categoría: ${category}`);
	};

	return (
		<main className="min-h-screen bg-primary flex flex-col gap-4 text-white font-nunito">
			<div>
				<PromotionalBanner />
			</div>
			{/* Sección de Categorías */}
			<section className="flex flex-col lg:flex-row gap-4 p-4 lg:h-80">
				{/* Categoría 1 - Artículos Promocionales */}
				<CategoryCard
					tittle="Artículos Promocionales"
					description="Pulóveres, Tazas, Gorras y más"
					colorGradient="blue"
					linkToNavigate="productos"
				/>
				<CategoryCard
					tittle="Artículos Promocionales"
					description="Pulóveres, Tazas, Gorras y más"
					colorGradient="pink"
					linkToNavigate="productos"
				/>
				<CategoryCard
					tittle="Artículos Promocionales"
					description="Pulóveres, Tazas, Gorras y más"
					colorGradient="yellow"
					linkToNavigate="productos"
				/>
			</section>
			{/* Sección de productos */}
			<section className="p-8">
				<h2 className="text-3xl font-bold mb-8 text-center">Productos Personalizables</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{genericProduct.map(product => (
						<ProductCardLandingPage key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	);
};

// Componente auxiliar para tarjetas de producto
