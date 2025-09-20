import { SelectLabelCoustom } from "@/components/SelectLabelCoustom";
import { Search } from "lucide-react";
import { useOrder } from "../hooks/useOrder";
import type { ColumnDef } from "@tanstack/react-table";
import type { Encargo } from "@/types/Product";
import { ListOrder } from "../components/ListOrder";
import { useCoustomTable } from "../hooks/useTable";
import { useState } from "react";
import { useTiempoTranscurrido } from "@/hooks/useTiempoTranscurrido";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { ActionButtonsFormOrder } from "../components/ActionButtonsFormOrder";
import CoustomSelect from "@/components/CoustomSelect";

type Props = {};

export const GestionEncargos = ({}: Props) => {
  const [rowExpand, setRowExpand] = useState<number[]>([]);
  const { encargos, deleteOrderByIdMutation ,updateOrderByIdMutation} = useOrder();
  const columOrder: ColumnDef<Encargo>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      header: "Creado",
      accessorKey: "create",
      enableSorting: true,
      sortingFn: "datetime",
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
      enableSorting: true,
    },
    {
      header: "Precio",
      accessorKey: "total",
      enableSorting: true,
      sortingFn: "alphanumeric",
    },
    {
      header: "Estado",
      accessorKey: "status",
      enableSorting: true,
      filterFn: "equalsString",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex justify-center items center">
            <CoustomSelect
              onChange={(e) => updateOrderByIdMutation.mutate({...row.original,status:e})}
              options={[
                { label: "Pendiente", value: "pendiente" },
                { label: "Completado", value: "completado" },
              ]}
              value={status}
              bgColor={`${
                status === "completado"
                  ? "bg-[#2C4CA4] text-blue-100 "
                  : "bg-[#7e6f1e]"
              }`}
              borderWidth="border-none"
              borderRadius="rounded-4xl"
              size="sm"
              textColor="white"
              className="w-[120px] text-center "
            />
          </div>
        );
      },
    },
    {
      id: "detalles",
      enableSorting: false,
      cell: ({ row }) => (
        <ActionButtonsFormOrder
          rowId={row.original.id}
          handleExpand={() =>
            setRowExpand((prev) =>
              prev.includes(row.original.id)
                ? prev.filter((id) => id !== row.original.id)
                : [...prev, row.original.id]
            )
          }
          isExpanded={rowExpand.includes(row.original.id)}
          handleDelete={() => deleteOrderByIdMutation.mutate(row.original.id)}
        />
      ),
    },
  ];
  const { table, filters, setFilters } = useCoustomTable({
    data: encargos,
    columns: columOrder,
    selctedRow: false,
  });

  const columTable = table.getHeaderGroups()[0].headers;
  const datos = table.getRowModel().rows;
  const deleteColumnFilter = (columnid: string) => {
    table.setColumnFilters((prev) => prev.filter((f) => f.id !== columnid));
  };
  const filterColumnByID = (updater: any, columnId: string) => {
    table
      .getHeaderGroups()[0]
      .headers.filter((colum) => colum.id === columnId)[0]
      .column.setFilterValue(updater);
  };
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
            value={filters}
            onChange={(e) => {
              setFilters(e.target.value);
              setRowExpand([]);
            }}
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
            onChange={(value: string | number) => {
              if (value === "todos") {
                deleteColumnFilter("status");
              } else {
                filterColumnByID(value, "status");
              }
              setRowExpand([]);
            }}
            options={[
              { label: "Todos", value: "todos" },
              { label: "Pendientes", value: "pendiente" },
              { label: "Completados", value: "completado" },
            ]}
            value={"todos"}
          />
        </div>
      </div>

      <div className="flex flex-col items-center pb-6 gap-3">
        <ListOrder
          data={datos}
          columnLabel={columTable}
          rowExpand={rowExpand}
        />
        <div
          id="pagination"
          className="flex  gap-1 items-center px-3 text-white"
        >
          <button
            onClick={() => table.setPageIndex(0)}
            className="rounded-full hover:bg-white/10 transition-colors ease-in-out duration-300 p-1"
          >
            <MdKeyboardDoubleArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              table.getCanPreviousPage() ? table.previousPage() : null
            }
            className="rounded-full hover:bg-white/10 transition-colors ease-in-out duration-300 p-1 "
          >
            <MdKeyboardArrowLeft className="w-6 h-6" />
          </button>
          <h1>
            Página{" "}
            <span className="font-bold bg-white/10 px-2 py-1 rounded-lg ">
              {table.getState().pagination.pageIndex + 1}
            </span>
            {"  "}
            <span className="font-bold">{table.getPageCount()}</span>
          </h1>
          <button
            onClick={() => (table.getCanNextPage() ? table.nextPage() : null)}
            className=" hover:bg-white/10 rounded-full transition-colors ease-in-out duration-300 p-1"
          >
            <MdKeyboardArrowRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="rounded-full hover:bg-white/10 transition-colors ease-in-out duration-300 p-1"
          >
            <MdKeyboardDoubleArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
