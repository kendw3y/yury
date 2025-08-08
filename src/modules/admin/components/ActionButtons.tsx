import { HiSearch } from "react-icons/hi"; 
import type { User } from "@/types/types";
import { motion,useAnimationControls } from "framer-motion";
import { EditButton } from "./EditButton";
import AddButton from "./AddButton";
import { DeletButton } from "./DeletButton";

interface ActionButtonsProps {
	filters: string;
	setFilters: (value: string) => void;
	rowSelcted: User[];
}
export const ActionButtons = ({ filters, setFilters, rowSelcted }: ActionButtonsProps) => {
	const controls = useAnimationControls()

	const handleHover = () => {
		controls.start("hover")
	}
	
	return (
		<div className="sm:flex sm:flex-row flex flex-col-reverse gap-3 px-4 sm:justify-between sm:items-center ">
			<div onMouseEnter={handleHover} className="flex items-center relative ">
				<motion.button 
				variants={{
					hover: {color:'#62748e'}
				}}
				animate={controls}
				className="absolute h-[40px] w-[40px] right-1 top-0 text-slate-700  px-2 flex items-center rounded">
					<HiSearch className="w-full h-full  " />
				</motion.button>
				<motion.input
					type="text"
					placeholder="Buscar..."
					className="sm:w-auto w-full h-10 pl-4 py-2 bg-transparent placeholder:text-gray-300 text-gray-300 text-md border-2 border-slate-700 rounded-3xl transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-500 shadow-md focus:shadow-md "
					value={filters}
					onChange={e => setFilters(e.target.value)}
				/>
			</div>
			<div className="flex  items-center justify-end gap-2 sm:gap-4">
				<EditButton disable={rowSelcted.length===0}  />
				<AddButton/>
				<DeletButton disable={rowSelcted.length===0} />
			</div>
		</div>
	);
};
