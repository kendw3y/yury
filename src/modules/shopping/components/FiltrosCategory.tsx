import React from "react";

type Props = {
	setColumnFilter: 
};

export const FiltrosCategory = ({}: Props) => {

    
	return (
		<div className="flex relative w-[230px] h-[40px]">
			<select
				onChange={e => handleSelectCategory(e.target.value)}
				className="bg-gray-800 w-full h-full px-2 peer appearance-none outline-2 outline-offset-2 outline-transparent focus:outline-gray-500 rounded-lg"
			>
				<option value="all">Todos</option>
				{mainCategories.map(c => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<ChevronDown className="absolute right-1 w-5 h-full peer-focus:rotate-180 transition-all ease-in-out duration-300 " />
		</div>
	);
};
