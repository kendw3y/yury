import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CoustomButton } from "../../../components/CoustomButton";
import { schema } from "@/schemas/userSchema";
import type { UserFormData } from "../interfaces/interfaces";
import { useUser } from "../hooks/useUser";
import { useRequired } from "@/hooks/useRequired";
import { TriangleAlert } from "lucide-react";

interface AddUserProps {
	handleIsOpen: () => void;
}

export const AddUser = ({ handleIsOpen }: AddUserProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormData>({
		resolver: yupResolver(schema),
	});

	const { addUserMutation } = useUser();

	const onsubmit = handleSubmit(data => {
		console.log(data);
		addUserMutation.mutate({
			id: Math.random().toString(),
			contrasena: data.contrasena,
			direccion: data.direccion,
			email: data.correo,
			Entidad: data.entidad,
			nombre_apellidos: data.nombre_apellidos,
			telefono: data.telefono,
		});
		handleIsOpen();
	});
	return (
		<form  className="flex flex-col gap-4 sm:w-[500px]" onSubmit={onsubmit}>
			<div className="grid md:grid-cols-2 grid-cols-1  gap-4">
				<div>
					<label className="block  font-medium text-blanco mb-1">Nombre y Apellidos</label>
					<input
						type="text"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("nombre_apellidos")}
					/>
					{errors.nombre_apellidos?.type !== "required" && (
						<p className="text-sm text-red-400">{errors.nombre_apellidos?.message}</p>
					)}
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Teléfono</label>
					<input
						type="tel"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("telefono")}
					/>
					{errors.telefono?.type !== "required" && (
						<p className="text-sm text-red-400">{errors.telefono?.message}</p>
					)}
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Correo electrónico</label>
					<input
						type="text"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("correo")}
					/>
					{errors.correo?.type !== "required" && (
						<p className="text-sm text-red-400">{errors.correo?.message}</p>
					)}
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Entidad</label>
					<input
						type="tel"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("entidad")}
					/>
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Contraseña</label>
					<input
						type="password"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("contrasena")}
					/>
					{errors.contrasena?.type !== "required" && (
						<p className="text-sm text-red-400">{errors.contrasena?.message}</p>
					)}
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Dirección</label>
					<input
						type="tel"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("direccion")}
					/>
				</div>
				<div>
					<label className="block  font-medium text-blanco mb-1">Confirmar Contraseña</label>
					<input
						type="password"
						className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
						{...register("conf_contrasena")}
					/>
					{errors.conf_contrasena?.type !== "required" && (
						<p className="text-sm text-red-400">{errors.conf_contrasena?.message}</p>
					)}
				</div>
			</div>
			<div className="sm:flex sm:flex-row flex flex-col  gap-6 center  items-end">
				<div className="flex flex-1 gap-1 self-start  items-center">
					{useRequired({ errors }) && (
						<>
							<TriangleAlert className="w-[18px] text-red-500" />
							<p className="text-red-500 text-[15px]">Todos los campos son requeridos</p>
						</>
					)}
				</div>
				<div className="flex gap-4">
					<CoustomButton
						type="submit"
						tittleButton="Aceptar"
						colorButton="#335BC6"
						hoverColor="#1c398e"
					/>
					<CoustomButton
						handleOnClick={() => {}}
						tittleButton="Cancelar"
						colorButton="#335BC6"
						hoverColor="#1c398e"
					/>
				</div>
			</div>
		</form>
	);
};
