
import { CoustomButton } from "@/components/CoustomButton";
import { ProductItems } from "../components/ProductItems";


type Props = {
	onContinue?: () => void;
};

export const ShoppingCar = ({ onContinue = ()=>{console.log("no llego")}  }: Props) => {
	return (
		<div className="flex  justify-center items center">
			<div className=" bg-[#111420] p-5 flex flex-col gap-4 text-white">
				<div className="">
					<h1 className=" text-center text-2xl font-bold text-white">Carrito</h1>
					<p className="text-center text-gray-400">7 productos | 4900 cup</p>
				</div>
				<div className="flex sm:justify-end justify-center max-w-5xl  ">
					<CoustomButton
						type="button"
						handleOnClick={onContinue}
						colorButton="#335ac673"
						hoverColor="#335ac6cb"
						tittleButton="Confirmar compra"
					/>
				</div>
				<div className=" max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
					<ProductItems />
				</div>
			</div>
		</div>
	);
};
