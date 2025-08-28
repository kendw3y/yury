import { type Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import type { Producto } from "../interfaces/interfaces";
import { mainCategories } from "@/data/categorias";
import CoustomSelect from "@/components/CoustomSelect";

type Props = {
	tableState: Table<Producto>;
	page:"admin"| "ecommers"
};

export const FiltrosGenerales = ({ tableState: table ,page}: Props) => {
	const deleteColumnFilter = (columnid:string)=> {
		table.setColumnFilters(prev => prev.filter(f => f.id!==columnid))
	}
	const filterColumnByID = (updater: any, columnId: string) => {
		table
			.getHeaderGroups()[0]
			.headers.filter(colum => colum.id === columnId)[0]
			.column.setFilterValue(updater);
	};

	const filterGeneral = (filter:string) => {
		switch(filter){
			case "all":
				deleteColumnFilter("favorite")
				deleteColumnFilter("isCoustom")
				break
			case "favorite":
				deleteColumnFilter("isCoustom")
				filterColumnByID(true,"favorite")
				break
			case "isCoustom":
				deleteColumnFilter("favorite")
				filterColumnByID(true,"isCoustom")
				break
			case "noCoustom":
				deleteColumnFilter("favorite")
				filterColumnByID(false,"isCoustom")
				break
			default:
				return
		}
	}

	const handleSelectCategory = (value: string) => {
		if (value === "all") {
			if (table.getState().columnFilters.filter(c => c.id === "category")) {
				deleteColumnFilter("category")
			}else{
				return
			}
		} else {
			filterColumnByID(value, "category");
		}
	};

	return (
		<div className="flex flex-col gap-4 items-start md:flex md:flex-row  md:justify-between md:items-end py-3 ">
			{/* Filtros principales */}
			<section className="pl-3 flex flex-col justify-center items-start  gap-2 flex-wrap  ">
				<h1 className="text-xl  ">Filtrar productos :</h1>
				<div className="sm:flex sm:flex-row flex  gap-2 ">
					<CoustomSelect onChange={(value:string|number)=>{}} options={[{label:"option1",value:"option1"},{label:"option1",value:"option1"},{label:"option1",value:"option1"}]} value={"option1"}  ></CoustomSelect>
					<div className="flex relative w-[150px] sm:text-[16px] text-sm sm:w-[230px] h-[40px] ">
						<select
							
							onChange={e => filterGeneral(e.target.value)}
							className="bg-gray-800 w-full h-full px-2 peer appearance-none outline-2 outline-offset-2 outline-transparent focus:outline-gray-500 rounded-lg"
						>
							<option value="all">Todos</option>
							{page==="ecommers"&&<option value="favorite">Favoritos</option>}
							<option value="isCoustom">Personalizable</option>
							<option value="noCoustom">No personalizable</option>
						</select>
						<ChevronDown className="absolute right-1 w-5 h-full peer-focus:rotate-180 transition-all ease-in-out duration-300 " />
					</div>
					<div className="flex relative w-[195px] sm:text-[16px] text-sm sm:w-[230px] h-[40px]">
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
				</div>
			</section>
			<section className="px-3 md:pr-8 ">
					<input
						type="text"
						value={table.getState().globalFilter}
						onChange={e => table.setGlobalFilter(e.target.value)}
						placeholder="Buscar productos..."
						className="w-[350px] sm:w-[230px]  md:flex-1 px-3 py-2 rounded-lg bg-gray-700 focus:bg-gray-700 focus:border-none  outline-2 outline-offset-2 outline-transparent focus:outline-gray-400 transition-all ease-in-out  text-white"
					/>
			</section>
		</div>
	);
};
