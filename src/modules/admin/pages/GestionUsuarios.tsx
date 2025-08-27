import { SelectLabelCoustom } from "@/components/SelectLabelCoustom"
import { Search } from "lucide-react"
import { ListOrder } from "../components/ListOrder"

type Props = {}

export const GestionUsuarios = (props: Props) => {
  return (
    <div className="h-full w-full py-4 px-10 flex flex-col gap-4">
			<div className="flex justify-center items-center">
				<h1 className="text-3xl text-gray-200 font-bold">Gestión de usuarios</h1>
			</div>
			<div className="flex gap-6 text-gray-100  ">
				<div className="flex relative flex-1">
					<input
						type="text"
						placeholder="Buscar encargo por ID, cliente o estado "
						className="pl-10 py-2 w-full rounded-md text-gray-200 bg-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-1 focus:outline-gray-400"
					/>
					<Search className="w-[18px] h-[18px] text-gray-400 absolute left-[12px] top-[10px] " />
				</div>
				<div className="flex">
					<span className="bg-gray-800 flex text-gray-400 justify-end items-center pl-3 pr-1 rounded-l-lg">
						Estado :
					</span>
					<SelectLabelCoustom
                    label="Estado"
						onChange={(value: string | number) => {}}
						options={[
							{ label: "Todos", value: "todos" },
							{ label: "Pendientes", value: "pendientes" },
							{ label: "Completados", value: "completados" },
						]}
						value={"todos"}
					></SelectLabelCoustom>
				</div>
			</div>

			<div>
				<ListOrder data={datos} columnLabel={columTable} rowExpand={rowExpand} />
				{/* <OrderSelectRowContextProvider>
					<OrderTable columns={columOrder} data={encargos} />
				</OrderSelectRowContextProvider> */}
			</div>
		</div>
  )
}