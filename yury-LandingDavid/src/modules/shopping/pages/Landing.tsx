import { genericProduct } from "@/data/productosGenericos";
import { ProductCardLandingPage } from "../components/ProductCardLandingPage";
import { CategoryCard } from "../components/CategoryCard";
import PromotionalBanner from "../components/BanerPromocional";

export const Landing = () => {
	return (
		<main className="min-h-screen bg-primary text-white font-nunito overflow-hidden">
			{/* Hero Section */}
			<div className="relative">
				<PromotionalBanner />
			</div>

			{/* Sección de Categorías con diseño moderno */}
			<section className="relative px-4 py-16 lg:py-24">
				{/* Background decorativo */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-blue/10"></div>
				<div className="absolute top-20 left-10 w-32 h-32 bg-pink/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow/20 rounded-full blur-3xl"></div>
				
				<div className="relative z-10 max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue to-pink bg-clip-text text-transparent">
							Categorías
						</h2>
						<p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
							Descubre nuestra amplia gama de productos personalizables
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<CategoryCard
							tittle="Artículos Promocionales"
							description="Pulóveres, Tazas, Gorras y más"
							colorGradient="blue"
						/>
						<CategoryCard
							tittle="Textiles Premium"
							description="Camisetas, Polos, Sudaderas"
							colorGradient="pink"
						/>
						<CategoryCard
							tittle="Accesorios"
							description="Bolsas, Llaveros, USB"
							colorGradient="yellow"
						/>
					</div>
				</div>
			</section>

			{/* Sección de productos modernizada */}
			<section className="relative px-4 py-16 lg:py-24 bg-gradient-to-t from-gray-900/50 to-transparent">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow via-pink to-blue bg-clip-text text-transparent">
							Productos Destacados
						</h2>
						<p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
							Personaliza cada detalle y haz realidad tus ideas
						</p>
					</div>
					
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{genericProduct.map(product => (
							<div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
								<ProductCardLandingPage product={product} />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Nueva sección de características */}
			<section className="relative px-4 py-16 lg:py-24">
				<div className="absolute inset-0 bg-gradient-to-r from-blue/10 via-transparent to-pink/10"></div>
				<div className="relative z-10 max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						<div className="text-center group">
							<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue to-blue/70 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
								<span className="text-3xl">D</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Diseño Personalizado</h3>
							<p className="text-gray-300 leading-relaxed">
								Crea diseños únicos con nuestras herramientas avanzadas de personalización
							</p>
						</div>
						
						<div className="text-center group">
							<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink to-pink/70 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
								<span className="text-3xl">E</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Entrega Rápida</h3>
							<p className="text-gray-300 leading-relaxed">
								Recibe tus productos personalizados en tiempo récord en toda La Habana
							</p>
						</div>
						
						<div className="text-center group">
							<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow to-yellow/70 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
								<span className="text-3xl">C</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Calidad Premium</h3>
							<p className="text-gray-300 leading-relaxed">
								Materiales de alta calidad y técnicas de impresión profesionales
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

// Componente auxiliar para tarjetas de producto
