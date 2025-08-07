import { CoustomButton } from "@/components/CoustomButton";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useSelectedRowContext } from "../context/SelectRowContext";
import { useUser } from "../hooks/useUser";

type Props = {
	disable: boolean;
};

export const DeletButton = ({ disable }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleIsOpen = () => {
		setIsModalOpen(!isModalOpen);
	};
    const { rowSelected} = useSelectedRowContext()
    const { deletOneUserMutation,deleteSomeUserMutation } = useUser()

    const handleDelet = () => {
        if(rowSelected.length >= 2){
            deleteSomeUserMutation.mutate(rowSelected.map(user => user.id))
        } else {
            deletOneUserMutation.mutate(rowSelected[0].id)
        }
        handleIsOpen()
    }

	return (
		<div className="flex ">
			<CoustomButton
				disable={disable}
				tittleButton="Eliminar"
				iconButton={IoMdTrash}
				handleOnClick={handleIsOpen}
				colorButton="#d40c636e"
				hoverColor="#d40c63cb"
				className="text-hidden"
			/>
			<Modal handleIsOpen={handleIsOpen} isOpen={isModalOpen} tittle="Eliminar">
				<div className="flex flex-col">
                    <p>¿Estás seguro que desea eliminar ({rowSelected.length}) usuario{rowSelected.length === 1?'':'s'}?</p>
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
