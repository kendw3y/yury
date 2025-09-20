import type { Product } from "@/modules/shopping/interfaces/interfaces"
import type { Column } from "@tanstack/react-table"

export const getColumn = (column: Column<Product>) => {
    const columnFilterValue = column.getFilterValue()
    const handleFilterChange = (value:unknown) => {
      column.setFilterValue(value)
    }

    return { columnFilterValue, handleFilterChange }
  }