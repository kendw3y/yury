import { Modal } from "@/components/Modal";
import { CoustomButton } from "@/components/CoustomButton";
import { Trash } from "lucide-react";
import { useState } from "react";

type Props = {
	productId: number,
	deletElement: ()=> void
}

export const ConfirmDelet = ({deletElement}: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleIsOpen = () => {
		setIsModalOpen(!isModalOpen);
	};
	const handleDelet = () => {
		deletElement()
		handleIsOpen()
	}
	
	return (
		<div className="w-full  flex justify-end">
			<Trash
				onClick={handleIsOpen}
				className=" sm:justify-self-start   cursor-pointer hover:text-red-400"
			/>
			<Modal tittle="Eliminar" handleIsOpen={handleIsOpen} isOpen={isModalOpen}>
				<div className="flex flex-col gap-3">
					<p className="text-center ">¿Está seguro que desea eliminar el producto de su carrito?</p>
					<div className="flex justify-between items-center">
						<CoustomButton handleOnClick={handleDelet} hoverColor="#f54927" colorButton="#F54927ab" tittleButton="Eliminar" />
						<CoustomButton
							handleOnClick={handleIsOpen}
							colorButton="#335ac673"
							hoverColor="#335ac6cb"
							tittleButton="Cancelar"
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};
