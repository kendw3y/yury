import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

import { flexRender, type ColumnDef } from "@tanstack/react-table";
import { useCoustomTable } from "../hooks/useTable";
import { ActionButtons } from "./ActionButtons";
import { useSelectedRowContext } from "../context/UserSelectRowContext";
import { useEffect } from "react";

interface TableProps {
  title?: string;
  data: Array<any>;
  columns: ColumnDef<any>[];
}

export function UserTable({ title, data, columns }: TableProps) {
  const { table, filters, setFilters } = useCoustomTable({
    columns,
    data,
    selctedRow: true,
  });

  const context = useSelectedRowContext();

  useEffect(() => {
    context?.setRowSelected(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    );
  }, [table.getSelectedRowModel().flatRows]);
  return (
    <div className=" flex flex-col gap-4 w-full  items-center py-4 px-10 rounded-2xl   text-gray-300  ">
      <h1 className="md:text-3xl sm:text-2xl text-xl  font-bold  text-center  ">
        {title ?? "Table"}
      </h1>
      <ActionButtons
        filters={filters}
        setFilters={setFilters}
        rowSelcted={table
          .getSelectedRowModel()
          .flatRows.map((row) => row.original)}
      />
      
      <div className="w-full flex flex-col pb-8">
        <div className="min-w-full bg-gray-900 overflow-x-auto rounded-lg">
          {/* Encabezado */}
          <div className="grid grid-cols-[40px_2fr_2fr_1fr_1fr_2fr_1fr_1fr] bg-gray-800 text-gray-100 font-semibold min-w-[800px]">
            {table.getHeaderGroups()[0].headers.map((header) => (
              <div key={header.id} className="p-3 text-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            ))}
          </div>
          {/* Filas */}
          {table.getRowModel().rows.map((row, i, a) => {
            return (
              <div key={row.id} className="flex flex-col">
                {/* Fila principal */}
                <div
                  className={`grid grid-cols-[40px_2fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-0 min-w-[800px] ${
                    i === a.length - 1 ? "" : "border-b-2"
                  } border-gray-800 transition-colors duration-150`}
                >
                  {row.getAllCells().map((cell) => (
                    <div
                      key={cell.id}
                      className={`p-4 text-center   text-gray-100`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="pagination" className="flex  gap-1 items-center px-3">
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
  );
}
