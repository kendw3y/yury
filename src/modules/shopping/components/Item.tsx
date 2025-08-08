import { useShoppingCar } from "@/hooks/useShoppingCar";
import type { Product } from "../interfaces/interfaces";
import { ConfirmDelet } from "./ConfirmDelet";

interface Props {
	product: Product
	
};

export const Item = ({product}: Props) => {
	const {deleteProductOfCar,queryClient} = useShoppingCar()
	const handleDelet = () => {
		deleteProductOfCar.mutate(product.id)
		queryClient.invalidateQueries({queryKey: ['productCar']})
		
	}
	return (
		<div className="justify-between mb-4 rounded-lg bg-[#1A1D2D] p-5 shadow-md sm:flex sm:justify-start">
			<img src="/assets/placeholder.jpg" alt="product-image" className="w-full rounded-lg sm:w-36" />
			<div className="sm:ml-4 sm:flex gap-4 sm:w-full sm:justify-between">
				<div className="mt-5 sm:mt-0">
					<h2 className="text-lg font-bold text-white">{product.name}</h2>
					<p className="mt-1 text-xs text-gray-400">{product.color}</p>
					<p className="mt-1 text-sm text-gray-400">x{product.quantity} unidades</p>
					<p className="font-medium mt-3">{product.price} cup</p>
				</div>
				<div className="mt-4 flex  flex-col h-full justify-between  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
					<ConfirmDelet productId={product.id} deletElement={handleDelet}/>
				</div>
			</div>
		</div>
	);
};
