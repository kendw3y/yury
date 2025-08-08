import { CoustomButton } from "@/components/CoustomButton";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { AddUser } from "./AddUser";
import { MdOutlineAdd } from "react-icons/md";

type Props = {};

const AddButton = ({}: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleIsOpen = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<div className="flex ">
			<CoustomButton
				tittleButton="Registrar"
				iconButton={MdOutlineAdd}
				handleOnClick={handleIsOpen}
				colorButton="#335ac673"
				hoverColor="#335ac6cb"
				className="text-hidden"
			/>
			<Modal handleIsOpen={handleIsOpen} isOpen={isModalOpen} tittle="Modificar">
				<AddUser handleIsOpen={handleIsOpen}></AddUser>
			</Modal>
		</div>
	);
};

export default AddButton;
