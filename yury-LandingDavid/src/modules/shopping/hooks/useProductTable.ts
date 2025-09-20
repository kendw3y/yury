import { useProduct } from "@/modules/admin/hooks/useProducts";
import { type ColumnFiltersState, type ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
import type { Producto } from "../interfaces/interfaces";

export const useProductTable = () => {
    const [columFilters, setColumFilters] = useState<ColumnFiltersState>([]);
    const [globalFilers, setGlobalFilters] = useState<string>("");

    const columns: ColumnDef<Producto>[] = [
        { accessorKey: "name", header: "Nombre", filterFn: "arrIncludesSome" },
        { accessorKey: "category", header: "Categoria", filterFn: "equalsString" },
        { accessorKey: "price", header: "Precio" },
        { accessorKey: "description", header: "Descripcion", filterFn: "includesString" },
        { accessorKey: "isCoustom", header: "Personalizable", filterFn: "equals" },
        { accessorKey: "favorite", header: "Favoritos", filterFn: "equals" },
    ];
    const { products } = useProduct()
    const table = useReactTable({
        columns,
        data: products,
        state: {
            columnFilters: columFilters,
            globalFilter: globalFilers,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumFilters,
        onGlobalFilterChange: setGlobalFilters,
    });

    return {
        table
    }
}