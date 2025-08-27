import { SelectLabelCoustom } from "@/components/SelectLabelCoustom";
import { Search, ChevronDown, X } from "lucide-react";
import { useOrder } from "../hooks/useOrder";
import type { ColumnDef } from "@tanstack/react-table";
import type { Encargo } from "@/types/Product";
import { ListOrder } from "../components/ListOrder";
import { useCoustomTable } from "../hooks/useTable";
import { useState } from "react";
import { useTiempoTranscurrido } from "@/hooks/useTiempoTranscurrido";

type Props = {};

export const GestionEncargos = ({}: Props) => {
  const [rowExpand, setRowExpand] = useState<number[]>([]);
  const { encargos } = useOrder();
  const columOrder: ColumnDef<Encargo>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Creado",
      accessorKey: "create",
      cell: ({ row }) => {
        const time = useTiempoTranscurrido(row.original.create.toString());
        return `${
          time?.days !== undefined && time?.days > 0
            ? `hace ${time?.days} días`
            : time?.hours !== undefined && time?.hours > 0
            ? `hace ${time.hours} horas`
            : time?.minutes !== undefined && time?.days > 0
            ? `hace ${time.minutes} minutos`
            : ""
        }`;
      },
    },
    {
      header: "Usuario",
      accessorKey: "client.nombre_apellidos",
    },
    {
      header: "Total",
      accessorKey: "total",
    },
    {
      header: "Estado",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex justify-center items center">
            <div
              className={`text-sm rounded-3xl w-[125px] h-[27px] font-bold  flex justify-center items-center ${
                status === "completado"
                  ? "bg-[#2C4CA4] text-blue-100 "
                  : "bg-[#7e6f1e]"
              }`}
            >
              <span>
                {status.replace(/^./, (letra) => letra.toUpperCase())}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "detalles",
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={() =>
              setRowExpand((prev) =>
                prev.includes(row.original.id)
                  ? prev.filter((id) => id !== row.original.id)
                  : [...prev, row.original.id]
              )
            }
            className="bg-gray-800 text-gray-50 px-2 py-1 rounded-lg cursor-pointer"
          >
            <ChevronDown
              className={`${
                rowExpand.includes(row.original.id) ? "rotate-180" : ""
              } w-5 h-5 transition-all ease-in-out duration-300 `}
            />
          </button>
          <button className="bg-gray-800 text-gray-50 px-2 py-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5"></X>
          </button>
        </div>
      ),
    },
  ];
  const { table } = useCoustomTable({
    data: encargos,
    columns: columOrder,
    selctedRow: false,
  });

  const columTable = table.getHeaderGroups()[0].headers;
  const datos = table.getRowModel().rows;
  console.log(columTable);

  return (
    <div className="h-full w-full py-4 px-10 flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl text-gray-200 font-bold">
          Gestión de encargos
        </h1>
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
          <SelectLabelCoustom
            label="Estado"
            className="w-36"
            onChange={(value: string | number) => {}}
            options={[
              { label: "Todos", value: "todos" },
              { label: "Pendientes", value: "pendientes" },
              { label: "Completados", value: "completados" },
            ]}
            value={"todos"}
          />
        </div>
      </div>

      <div>
        <ListOrder
          data={datos}
          columnLabel={columTable}
          rowExpand={rowExpand}
        />
        {/* <OrderSelectRowContextProvider>
					<OrderTable columns={columOrder} data={encargos} />
				</OrderSelectRowContextProvider> */}
      </div>
    </div>
  );
};
