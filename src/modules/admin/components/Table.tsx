import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
	MdKeyboardArrowRight,
	MdKeyboardArrowLeft,
} from "react-icons/md";

import { flexRender } from "@tanstack/react-table";
import { useCoustomTable } from "../hooks/useTable";
import { ActionButtons } from "./ActionButtons";
import { useSelectedRowContext } from "../context/SelectRowContext";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

interface TableProps {
	title?: string;
}

export function Table({ title }: TableProps) {
	
	const { table, filters, setFilters } = useCoustomTable();
	const {isLoadingUser,status} = useUser()
	
	const context = useSelectedRowContext()

	useEffect(() => {
	  context?.setRowSelected(table.getSelectedRowModel().flatRows.map(row => row.original))
	}, [table.getSelectedRowModel().flatRows])
	
	
	return (
		<div className=" flex flex-col gap-6 w-full  md:px-16 sm:pt-8 pt-3 sm:px-2 px-4 text-gray-300 ">
			<h1 className="md:text-4xl sm:text-3xl text-2xl  font-bold  text-center  ">
				{title ?? "Table"}
			</h1>
			<ActionButtons
				filters={filters}
				setFilters={setFilters}
				rowSelcted={table.getSelectedRowModel().flatRows.map(row => row.original)}
			/>
			<div className=" overflow-x-auto rounded-t-xl  shadow-xl bg-gray-900">
				<table className="w-full min-w-[800px] overflow-x-auto">
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id} className="bg-[#1f2d3f]  ">
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										onClick={header.column.getToggleSortingHandler()}
										className="text-center py-3 px-2 text-blanco "
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody key={table.getPageCount()}>
						{isLoadingUser? <tr><td>karel</td></tr> :table.getRowModel().rows.map(row => (
							<tr key={row.id} className=" ">
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className="py-4 px-2 text-center border-b border-[#19264193]">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-end gap-1 items-center px-3">
				<button
					onClick={() => table.setPageIndex(0)}
					className="rounded-full hover:bg-white/10 transition-colors ease-in-out duration-300 p-1"
				>
					<MdKeyboardDoubleArrowLeft className="w-6 h-6" />
				</button>
				<button
					onClick={() => (table.getCanPreviousPage() ? table.previousPage() : null)}
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
			<h1>{status}</h1>
		</div>
	);
}
