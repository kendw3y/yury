import type { User } from "@/types/types";
import { createContext, useContext, useState, type JSX } from "react";

interface StateContext {
	rowSelected: User[];
	setRowSelected: (users: User[]) => void;
}
interface ProviderProps {
	children: JSX.Element;
}
const SelectRowContext = createContext<StateContext | undefined>(undefined);

export const SelectRowContextProvider = ({ children }: ProviderProps) => {
	const [selectedRow, setSelectedRow] = useState<User[]>([]);

	const setRowSelected = (users:User[]) => {
		setSelectedRow(users);
	};

	return (
		<SelectRowContext.Provider value={{ rowSelected: selectedRow, setRowSelected }}>
			{children}
		</SelectRowContext.Provider>
	);
};

export const useSelectedRowContext = () => {
    const context = useContext(SelectRowContext)
    if(context===undefined){
        throw new Error('useSelectedRowContext necesita un provider')
    }
    return context
}
