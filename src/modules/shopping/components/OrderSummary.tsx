import { FaShippingFast } from "react-icons/fa";
import { useCalculateTotal } from "../hooks/useCalculateTotal";
import { CoustomButton } from "@/components/CoustomButton";
import {products} from '@/data/data.json'

interface OrderSummaryProps {
	onBack: () => void;
	onContinue: () => void;
}
export const OrderSummary = ({ onBack, onContinue }: OrderSummaryProps) => {
	const { total: Total } = useCalculateTotal();
	const total = parseFloat(Total);
	let envio = 234;
	return (
		<div className="flex  justify-center items-center py-8 sm:pt-6 text-white">
			<div className=" rounded-lg bg-gray-900 shadow-2xl py-10 sm:py-4 px-2 sm:px-6 flex  flex-col gap-8 sm:gap-3 items-center justify-center ">
				<h2 className="text-2xl font-bold  text-white ">Resumen del precio</h2>
				<div className="w-full mb-3  py-2 px-3 rounded-lg flex  flex-col gap-3  bg-gray-900/30 scroll-container snap-y snap-mandatory  md:max-h-[305px] ">
					{products.map(product => (
						<div key={product.id} className=" flex gap-16 justify-between py-2 px-3 items-center rounded-lg bg-gray-800 shadow-md transition-all duration-300 ease-in-out">
							<span className="">{product.name}</span>
							<span>{(product.quantity * product.price).toFixed(2)}</span>
						</div>
					))}
				</div>
				
				<div className="w-full flex justify-between font-bold items-center">
					<span className=" shrink flex justify-between bg-gray-800 self-start p-2 shadow-sm rounded-lg gap-4">
						<div className="flex gap-2 ">
							<FaShippingFast className="w-5 h-5" />
							<span className="">Envío :</span>
						</div>
						<span>${envio}</span>
					</span>
					<span className="  flex justify-between items-center text-xl p-2 ">
						<div className="flex  gap-2 ">
							<span>Total :  </span>
						</div>
						<span className="px-2"> ${envio + total}</span>
					</span>
				</div>
				<div className="flex justify-between w-full">
					<CoustomButton
						handleOnClick={onBack}
						hoverColor="#fccf08d5"
						colorButton="color-mix(in oklab, #fccf08d5 60%, transparent)"
						tittleButton="  Atrás  "
					/>
					<CoustomButton
						handleOnClick={onContinue}
						colorButton="#1c398e"
						hoverColor="#335BC6"
						tittleButton="Continuar con el pago"
						className=" "
					/>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
