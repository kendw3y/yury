import { CoustomButton } from "@/components";

export const AutenticacionMayor = () => {
	return (
		<div className="flex flex-col  items-center justify-center nunito-normal h-screen text-gray-200">
			<div className=" grid grid-cols-1 gap-7 w-[350px]  sm:w-[410px] bg-gray-900   rounded-xl shadow-lg p-5 md:p-10">
				<h1 className="text-3xl font-bold text-center ">Administrar</h1>
				<form action="" className="grid grid-cols-1 gap-5">
					<div>
						<label htmlFor="telefono" className="block mb-2  font-medium text-gray-300">
							Número de teléfono
						</label>
						<input
							type="text"
							id="telefono"
							className="w-full rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500w-full p-2 text-gray-300  outline-none"
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
						/>
					</div>
					<div className="flex  justify-between items-center">
						<CoustomButton
							type="submit"
							handleOnClick={() => {}}
							colorButton="#335ac673"
							hoverColor="#335ac6cb"
							tittleButton="Administrar"
						/>
						<span className="text-blue-500 cursor-pointer text-center hover:underline">
							¿Olvidaste tu contraseña?{" "}
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
