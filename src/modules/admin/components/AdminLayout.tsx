import { Outlet } from "react-router-dom";
import { SiderMenu } from "./SiderMenu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type Props = {};

export const AdminLayout = ({}: Props) => {
	const [showSiderMenu,setShowSiderMenu] = useState(false)
	return (
		<div className="flex flex-col   h-[100vh] ">
      {/* Barra superior */}
			<nav className="bg-gray-900 w-full h-[61px] flex items-center gap-2 px-4  py-2 relative z-20 shadow-md border-b border-[#0a0c13b0]">
				{showSiderMenu?<X className="text-gray-300 cursor-pointer " onClick={()=> setShowSiderMenu(false)}/>:<Menu className="text-gray-300 cursor-pointer lg:hidden" onClick={()=>setShowSiderMenu(true)}/>}
				<div className="flex items-center gap-1  ">
					<img src="/assets/logo.png" alt="Logo" className="h-11 w-11  " />
					<div className="text-center text-white ">
						<h1 className="text-lg font-bold  ">
							YURY <span className="text-base  font-medium leading-tight">impresiones</span>
						</h1>
						<p className="text-xs   text-gray-300 leading-tight">De tu sueño a la realidad</p>
					</div>
				</div>
			</nav>
			<main className="flex min-h-[90%] ">
				<SiderMenu show={showSiderMenu}/>
				{showSiderMenu&&<div onClick={() => setShowSiderMenu(false)} className="bg-gray-950 opacity-30 transition-all ease-in-out duration-500  fixed inset-0 z-10" ></div>}
				<div className="  w-full py-4 scroll-container   flex justify-center  ">
					<Outlet></Outlet>
				</div>
				<div className="fixed ">

				</div>
			</main>
		</div>
	);
};
