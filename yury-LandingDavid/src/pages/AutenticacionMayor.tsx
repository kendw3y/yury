import { CoustomButton } from "@/components";
import { useForm,  } from "react-hook-form";
import { schema } from "@/schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormData {
	telefono: string;
	contrasena: string;
}

export const AutenticacionMayor = () => {
	const {login} = useAuth();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit((data: FormData) => {
		console.log(data);
		login("123456");
		navigate("/admin/encargos");
	});
	

	return (
		<div className="flex flex-col  items-center justify-center nunito-normal h-screen text-gray-200">
			<div className=" grid grid-cols-1 gap-7 w-[350px]  sm:w-[410px] bg-gray-900   rounded-xl shadow-lg p-5 md:p-10">
				<h1 className="text-3xl font-bold text-center ">Entrar</h1>
				<form onSubmit={onSubmit} className="grid grid-cols-1 gap-5">
					<div>
						<label htmlFor="telefono" className="block mb-2  font-medium text-gray-300">
							Número de teléfono
						</label>
						<input
							type="text"
							id="telefono"
							className="w-full rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500w-full p-2 text-gray-300  outline-none"
							{...register("telefono")}
						/>
					</div>
					<div>
						<label htmlFor="contrasena" className="block mb-2  font-medium text-gray-300">
							Contraseña
						</label>
						<input
							type="password"
							id="contrsena"
							className="w-full rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500w-full p-2 text-gray-300  outline-none"
							{...register("contrasena")}
						/>
					</div>
					<div className="flex  justify-end items-center">
						<CoustomButton
							type="submit"
							handleOnClick={() => {}}
							colorButton="#335ac673"
							hoverColor="#335ac6cb"
							tittleButton="Administrar"
							className=""
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
