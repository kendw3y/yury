import { type Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import type { Producto } from "../interfaces/interfaces";
import { mainCategories } from "@/data/categorias";
import { SelectLabelCoustom } from "@/components/SelectLabelCoustom";

type Props = {
  tableState: Table<Producto>;
};

export const FiltrosGenerales = ({ tableState: table }: Props) => {
  const deleteColumnFilter = (columnid: string) => {
    table.setColumnFilters((prev) => prev.filter((f) => f.id !== columnid));
  };
  const filterColumnByID = (updater: any, columnId: string) => {
    table
      .getHeaderGroups()[0]
      .headers.filter((colum) => colum.id === columnId)[0]
      .column.setFilterValue(updater);
  };

  const filterGeneral = (filter: string) => {
    switch (filter) {
      case "all":
        deleteColumnFilter("favorite");
        deleteColumnFilter("isCoustom");
        break;
      case "favorite":
        deleteColumnFilter("isCoustom");
        filterColumnByID(true, "favorite");
        break;
      case "isCoustom":
        deleteColumnFilter("favorite");
        filterColumnByID(true, "isCoustom");
        break;
      case "noCoustom":
        deleteColumnFilter("favorite");
        filterColumnByID(false, "isCoustom");
        break;
      default:
        return;
    }
  };

  const handleSelectCategory = (value: string) => {
    if (value === "all") {
      if (table.getState().columnFilters.filter((c) => c.id === "category")) {
        deleteColumnFilter("category");
      } else {
        return;
      }
    } else {
      filterColumnByID(value, "category");
    }
  };

  return (
    <div className="flex flex-col gap-4   md:flex md:flex-row  md:justify-between   ">
      <section className=" flex-1 h-full">
        <div className="flex relative flex-1 h-full">
          <input
            value={table.getState().globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            type="text"
            placeholder="Buscar productos..."
            className="pl-10 py-3 w-full   rounded-md sm:h-full text-gray-200 bg-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-1 focus:outline-gray-400"
          />
          <Search className="w-[18px] h-[18px] text-gray-400 absolute left-[12px] top-[12px] " />
        </div>
      </section>
      {/* Filtros principales */}
      <section className=" flex flex-col justify-center items-start  gap-2 flex-wrap  ">
        <div className="sm:flex sm:flex-row flex  gap-2 flex-wrap ">
          <SelectLabelCoustom
            className="w-[150px] h-full"
            label="Tipo"
            onChange={(value) => filterGeneral(value)}
            value="all"
            options={[
              {
                label: "Todos",
                value: "all",
              },
              { label: "Personalizable", value: "isCoustom" },
              { label: "No personalizable", value: "noCoustom" },
            ]}
          />
          <SelectLabelCoustom
            className="w-52"
            label="Categoría"
            onChange={(value) => handleSelectCategory(value)}
            value="all"
            options={[
              { label: "Todos", value: "all" },
              ...mainCategories.map((value) => ({
                label: value.name,
                value: value.id,
              })),
            ]}
          />
        </div>
      </section>
    </div>
  );
};
