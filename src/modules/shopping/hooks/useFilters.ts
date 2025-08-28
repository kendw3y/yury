import { useEffect, useState } from "react";

interface =

export const useFilters = () => {
    const [filtersGen, setFiltersGen] = useState<string>("all");
	const [subCategory, setSubcategory] = useState<string>("all");
    const filterColumnByID = (updater: any, columnId: string) => {
            table
                .getHeaderGroups()[0]
                .headers.filter(colum => colum.id === columnId)[0]
                .column.setFilterValue(updater);
        };
    
    const filterAll = () =>
            table.setColumnFilters(prev =>
                prev.filter(f => {
                    if (f.id !== "isCoustom" && f.id !== "favorite") {
                        return f;
                    }
                })
            );
    
        useEffect(() => {
            switch (filtersGen) {
                case "all":
                    filterAll();
                    break;
                case "favorite":
                    filterColumnByID(true, "favorite");
                    break;
                case "isCoustom":
                    filterColumnByID(true, "isCoustom");
                    break;
                case "noCoustom":
                    filterColumnByID(false, "isCoustom");
                    break;
                default:
                    return;
            }
        }, [filtersGen]);

    return {}

}