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
import { type User } from "@/types/types";
import { useUser } from "./useUser";

export const useCoustomTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [filters, setFilters] = useState("");
	const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

	const columns: ColumnDef<User>[] = [
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
		{
			header: "Nombre y apellidos",
			accessorKey: "nombre_apellidos",
		},
		{
			header: "Email",
			accessorKey: "email",
		},
		{
			header: "Teléfono",
			accessorKey: "telefono",
		},
		{
			header: "Entidad",
			accessorKey: "Entidad",
		},
		{
			header: "Dirección",
			accessorKey: "direccion",
		},
	];

	const { users } = useUser();
	const data: User[] = users ?? [];

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
