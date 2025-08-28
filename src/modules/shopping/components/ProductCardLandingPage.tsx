import type { GenericProduct } from '@/data/productosGenericos';

type Props = {
    product: GenericProduct
}

export const ProductCardLandingPage = ({ product }: Props) => (
	<div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 group">
		<div className="aspect-square overflow-hidden">
			<img
				src={product.image}
				alt={product.name}
				className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
			/>
		</div>
		<div className="absolute inset-0 bg-[#0000006e]  flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
			<h3 className="text-xl font-bold mb-2">{product.name}</h3>
			<button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors">
				¡Personaliza ya!
			</button>
		</div>
	</div>
);

