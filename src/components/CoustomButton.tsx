import { motion } from "framer-motion";
import type { IconType } from "react-icons/lib";


interface CoustomButtonProps {
	hoverColor:string
    colorButton?:string
	type?:"button" | "submit" | "reset" | undefined
    tittleButton?:string
    iconButton?: IconType
    handleOnClick?: () => void 
	className?:string,
	disable?:boolean
	
}

export const CoustomButton = ( { iconButton : Icon,handleOnClick=() => {},className,tittleButton,colorButton ,hoverColor,type="button",disable=false} : CoustomButtonProps ) => {
	return (
		<motion.button
		type={type}
		disabled={disable}
			layout
			whileHover={!disable?{
				scale: 1.08,
				backgroundColor: `${ hoverColor?? '#ffffff'}`
			}:{}}
            whileTap={{
                scale:0.9
            }}
			transition={{
				duration: 0.18,
			}}
			style={{backgroundColor:`${colorButton?? '#ffffff'}`}}
			onClick={handleOnClick}
			className={`${className} cursor-pointer disabled:opacity-30 flex rounded-3xl  py-2 pl-5 pr-5 gap-1 shadow-md `} 
		>
			{Icon&&<Icon className="w-5 h-full" />}
			<span className={`text-[16px] h-full font-bold text-center ${className?.includes('text-hidden')?"hidden sm:block":""}`}>{tittleButton?tittleButton:""}</span>
		</motion.button>
	);
};
