import { CoustomButton } from "@/components/CoustomButton";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { EditUser } from "./EditUser";

type Props = {
	disable: boolean;
};

export const EditButton = ({ disable }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleIsOpen = () => {
		setIsModalOpen(!isModalOpen);
	};
	
	return (
		<div className="flex ">
			<CoustomButton
				disable={disable}
				tittleButton="Modificar"
				iconButton={MdEdit}
				handleOnClick={handleIsOpen}
				colorButton="#fccf0831"
				hoverColor="#fccf08cb"
				className="text-hidden"
			/>
			<Modal handleIsOpen={handleIsOpen} isOpen={isModalOpen} tittle="Editar">
				<EditUser handelIsOpen={handleIsOpen}></EditUser>
			</Modal>
		</div>
	);
};
