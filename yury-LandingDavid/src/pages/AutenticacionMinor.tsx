

export const AutenticacionMinor = () => {
  return (
    <div className="flex flex-col  items-center justify-center nunito-normal h-screen">
        <div className="w-full grid grid-cols-1 gap-7   max-w-sm bg-gray-900   rounded-xl shadow-lg p-10">
            <h1 className="text-3xl font-bold text-center ">Entrar</h1>
            <form action="" className="grid grid-cols-1 gap-5">
                <div>
                    <label htmlFor="telefono" className="block mb-2  font-medium text-gray-300">Número de teléfono</label>
                    <input type="text" id="telefono" className="w-full rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500w-full p-2 text-gray-300  outline-none"  />
                </div>
                <div>
                    <label htmlFor="contrasena" className="block mb-2  font-medium text-gray-300">Contraseña</label>
                    <input type="password" id="contrsena" className="w-full rounded-md bg-gray-800 text-blanco focus:outline-none  focus:bg-gray-700 transition-colors ease-in-out duration-500w-full p-2 text-gray-300  outline-none" />
                </div>
                <div className="flex justify-between items-center ">
                    <button type="submit" className="px-6 py-2  text-blanco rounded-lg bg-[#335BC6] hover:bg-[#335BC6]/60 transition-colors ease-in-out duration-300">
                        Entrar
                    </button>
                    <span className="text-blue-700 cursor-pointer hover:underline"> ¿Olvidaste tu contraseña? </span>
                </div>
            </form>
        </div>
    </div>
  )
}

