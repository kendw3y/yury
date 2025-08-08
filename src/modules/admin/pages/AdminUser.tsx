import { Table } from "../components/Table";
import { SelectRowContextProvider } from "../context/SelectRowContext";

export function AdminUser() {
	
	return (
	<SelectRowContextProvider>
		<Table title="Gestión de usuarios" />
	</SelectRowContextProvider>
);
}
