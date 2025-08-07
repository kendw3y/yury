import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelect } from "../hooks/useSelect";
import { IoIosArrowDown } from "react-icons/io";
import { CoustomButton } from "@/components/CoustomButton";
import { schema } from "@/schemas/productSchema";
import { TriangleAlert } from "lucide-react";
import { useRequired } from "@/hooks/useRequired";

interface DeliveryFormProps {
	onBack: () => void;
	onContinue: () => void;
}
interface FormData {
	full_name: string;
	phone: string;
	email: string;
	address: string;
	provincia: string;
	municipio: string;
}

export const DeliveryForm = ({ onBack, onContinue }: DeliveryFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, touchedFields },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const { provincias, municipios } = useSelect(watch().provincia);

	const onSubmit = handleSubmit(data => {
		console.log(data);
		onContinue();
	});

	return (
		<div className="sm:px-10 sm:py-6 flex text-white justify-center p-3  ">
			<div className="bg-[#1A1D2D] sm:rounded-xl rounded-lg shadow-xl flex flex-col gap-6 p-6  ">
				<h2 className="text-2xl text-center font-bold  text-white">Información de entrega</h2>
				<form onSubmit={onSubmit} className="">
					<div className="grid lg:grid-cols-[340px_340px] sm:grid-cols-[400px] grid-cols-[300px] justify-center  gap-6">
						<div>
							<label className="block  font-medium text-blanco mb-1">Nombre Completo</label>
							<input
								type="text"
								className="w-full px-3 py-2  rounded-md bg-gray-800 text-blanco focus:outline-none focus:bg-gray-700 transition-colors ease-in-out duration-500 "
								{...register("full_name")}
							/>
						</div>
						<div>
							<label className="block  font-medium text-blanco mb-1">Teléfono</label>
							<input
								type="text"
								className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
								{...register("phone")}
							/>
							{errors.phone?.type !== "required" && (
								<p className="text-red-500 text-sm ">{errors.phone?.message}</p>
							)}
						</div>
						<div>
							<label className="block  font-medium text-blanco mb-1">Email</label>
							<input
								type="email"
								className="w-full px-3 py-2 rounded-md bg-gray-800  text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
								{...register("email")}
							/>
							{errors.email?.type !== "required" && (
								<p className="text-red-500 text-sm ">{errors.email?.message}</p>
							)}
						</div>
						<div>
							<label className="block  font-medium text-blanco mb-1">Dirección</label>
							<input
								type="text"
								className="w-full px-3 py-2 rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500"
								{...register("address")}
							/>
						</div>
						<div className="">
							<label className="block  font-medium text-blanco mb-1">Provincia</label>
							<div className="w-full relative flex">
								<select
									{...register("provincia")}
									className="w-full px-3 py-2 appearance-none peer rounded-md bg-gray-800 text-blanco focus:outline-none focus:bg-gray-700 transition-colors ease-in-out duration-500"
								>
									{provincias.map(provincia => (
										<option key={provincia.value} value={provincia.value}>
											{provincia.label}
										</option>
									))}
								</select>
								<IoIosArrowDown className="text-white absolute top-[30%] peer-focus:rotate-180 transition-all ease-in-out duration-500 right-2  "></IoIosArrowDown>
							</div>
							{errors.provincia?.type !== "required" && (
								<p className="text-red-500 text-sm ">{errors.provincia?.message}</p>
							)}
						</div>
						<div className="">
							<label className="block  font-medium text-blanco mb-1">Municipio</label>
							<div className="flex w-auto">
								<div className="flex relative w-full">
									<select
										value={errors.provincia && " " }
										{...register("municipio")}
										disabled={!touchedFields?.provincia}
										className="w-full px-3 py-2 peer rounded-md appearance-none bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500 disabled:opacity-50"
									
									>
										{municipios.map(municipio => (
											<option key={municipio.value} value={municipio.value}>
												{municipio.label}
											</option>
										))}
									</select>
									<IoIosArrowDown className="text-white absolute top-[30%] peer-focus:rotate-180 transition-all ease-in-out duration-500 right-2  "></IoIosArrowDown>
								</div>
							</div>
							{errors.municipio?.type !== "required" && (
								<p className="text-red-500 text-sm ">{errors.municipio?.message}</p>
							)}
						</div>
					</div>
					<div className="mt-4 flex flex-col md:flex md:flex-row justify-between items-center gap-4 md:gap-4">
						<div className="flex gap-2">
							{useRequired({errors}) && (
								<>
									<TriangleAlert className="w-5 text-red-500" />
									<p className="text-red-500">Todos los campos son requeridos</p>
								</>
							)}
						</div>
						<div className="flex gap-4">
							<CoustomButton
								type="button"
								handleOnClick={onBack}
								hoverColor="#fccf08d5"
								colorButton="color-mix(in oklab, #fccf08d5 60%, transparent)"
								tittleButton="  Atrás  "
							/>
							<CoustomButton
								type="submit"
								colorButton="#335ac673"
								hoverColor="#335ac6cb"
								tittleButton="Continuar con el pago"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
