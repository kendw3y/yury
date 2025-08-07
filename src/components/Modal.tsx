import React from "react";
import {XIcon} from "lucide-react"
type Props = {
    tittle?:string
	isOpen: boolean;
	handleIsOpen: () => void;
    children?: React.JSX.Element
};

export const Modal = ({ handleIsOpen, isOpen,children ,tittle}: Props) => {
    if(!isOpen){
        return null;
    }
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center overflow-auto bg-[#00000063]">
			<div className="  h-full sm:h-auto w-full sm:w-auto ">
				<div className="relative flex flex-col gap-4 bg-[#1A1D2D] rounded-2xl shadow p-6 ">
                    <h1 className="text-xl text-center">{tittle&&tittle}</h1>
					{/* Botón de cerrar */}
					<button
						type="button"
						onClick={handleIsOpen}
						className="absolute cursor-pointer top-3 right-2.5 text-gray-500 bg-transparent hover:bg-[#00000015]  rounded-full text-sm p-1.5 ml-auto inline-flex items-center "
					>
						<XIcon/>
					</button>
					<div className="">{children&&children}</div>
				</div>
			</div>
		</div>
	);
};
