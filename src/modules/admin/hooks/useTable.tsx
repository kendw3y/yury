import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useState } from "react";

interface useCoustomTableProps {
  data: Array<any>;
  columns: ColumnDef<any>[];
  selctedRow: boolean;
}

export const useCoustomTable = ({
  data: datas,
  columns: columnas,
  selctedRow,
}: useCoustomTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState("");
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {}
  );

  const columns: ColumnDef<any>[] = selctedRow
    ? [
        {
          id: "checkbox",
          header: ({ table }) => (
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
            </label>
          ),
          cell: ({ row }) => (
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
            </label>
          ),
        },
        ...columnas,
      ]
    : [...columnas];
  const data: Array<any> = datas ?? [];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filters,
      rowSelection: rowSelectionState,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilters,
    onRowSelectionChange: setRowSelectionState,
    enableRowSelection: true,
  });

  return {
    table,
    filters,
    setFilters,
  };
};
