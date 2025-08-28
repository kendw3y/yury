import type { Encargo } from "@/types/Product";
import type { User } from "@/types/types";
import { createContext, useContext, useState, type JSX } from "react";

export interface StateContext {
	rowSelected: Encargo[];
	setRowSelected: (encargo: Encargo[]) => void;
}
interface ProviderProps {
	children: JSX.Element;
}
const OrderSelectRowContext = createContext<StateContext | undefined>(undefined);

export const OrderSelectRowContextProvider = ({ children }: ProviderProps) => {
	const [selectedRow, setSelectedRow] = useState<Encargo[]>([]);

	const setRowSelected = (encargo:Encargo[]) => {
		setSelectedRow(encargo);
	};

	return (
		<OrderSelectRowContext.Provider value={{ rowSelected: selectedRow, setRowSelected }}>
			{children}
		</OrderSelectRowContext.Provider>
	);
};

export const useOrderSelectedRowContext = () => {
    const context = useContext(OrderSelectRowContext)
    if(context===undefined){
        throw new Error('useSelectedRowContext necesita un provider')
    }
    return context
}
