import Lottie from "lottie-react";
import animation from './../../../../public/Animation - 1751001094827.json';
import { CoustomButton } from "@/components/CoustomButton";


type Props = {
    setShow:()=>void
};

export function SuccessfulAnimate({setShow}: Props) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0  flex flex-col justify-center items-center z-50 bg-[#111420] ">
      <div className="flex flex-col items-center py-4 gap-5 sm:gap-7 overflow-auto">
          <Lottie animationData={animation} className="w-52 h-52 sm:w-64 sm:h-64"></Lottie>
          <div className="text-center">
            <h1 className="text-4xl font-black">Pedido Confirmado</h1>
            <p className="text-lg sm:text-2xl">
              Gracias por su compra. Te contactaremos pronto para confirmar los
              detalles.
            </p>
          </div>
          <div className="bg-gray-100 text-center flex flex-col gap-5 px-7 py-3 sm:p-4 text-xl sm:text-2xl font-bold rounded-2xl text-black sm:w-full">
            <span className="font-black text-2xl sm:text-3xl">Información de contacto</span>
            <div className="flex flex-col ">
                <span>Email: hola@gmail.com</span>
                <span>Teléfono: +5358242569</span>
            </div>
          </div>
          <div className="flex  justify-center ">
            <CoustomButton
              handleOnClick={setShow}
              tittleButton="Volver a Inicio"
              colorButton="#335ac673"
						  hoverColor="#335ac6cb"
              type="button"
              
            />
            
          </div>
      </div>
    </div>
  );
}
