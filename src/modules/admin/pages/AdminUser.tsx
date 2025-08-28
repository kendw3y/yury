import type { User } from "@/types/types";
import { UserTable } from "../components/UserTable";
import { SelectRowContextProvider } from "../context/UserSelectRowContext";
import { useUser } from "../hooks/useUser";
import type { ColumnDef } from "@tanstack/react-table";

export function AdminUser() {
	const { users } = useUser();
	const data: User[] = users ?? [];
	const columns: ColumnDef<User>[] = [
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
	return (
	<SelectRowContextProvider>
		<UserTable data={data} columns={columns} title="Gestión de usuarios" />
	</SelectRowContextProvider>
);
}
