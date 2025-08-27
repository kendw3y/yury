import { LogOut, ShoppingBag, Truck, Users } from "lucide-react";
import { Link,useLocation } from "react-router-dom";

type Props = {
	show: boolean;
};

export const SiderMenu = ({ show }: Props) => {
	const location = useLocation()
	console.log(location)
	return (
		<div
			className={`w-[18%]  bg-gray-900   px-4 py-3  lg:flex ${
				show ? "absolute  w-[250px] h-full z-20" : "hidden"
			} flex-col items-center`}
		>
			<div className="flex flex-col w-full h-full justify-between">
				<div className="flex flex-col w-full gap-3 ">
				
					<ul className="flex flex-col gap-2 w-full ">
						<Link to={"gestion_products"} className="w-full">
							<li className={`text-gray-200 flex gap-4 ${location.pathname==='/admin/gestion_products'?'bg-gray-800':'bg-transparent'} hover:bg-white/5 px-5 py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300`}>
								<ShoppingBag className="w-5 h-5 " />
								<span className="font-medium ">Productos</span>
							</li>
						</Link>
						<Link to={"gestion_encargos"}>
							<li className={`text-gray-200 flex gap-4 ${location.pathname==='/admin/gestion_encargos'?'bg-gray-800':'bg-transparent'} hover:bg-white/5 px-5 py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300`}>
								<Truck className="w-5 h-5 " />
								<span className="font-medium ">Encargos</span>
							</li>
						</Link>
						<Link to={"gestion_user"}>
							<li className={`text-gray-200 flex gap-4 ${location.pathname==='/admin/gestion_user'?'bg-gray-800':'bg-transparent'} hover:bg-white/5 px-5 py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300`}>
								<Users className="w-5 h-5 " />
								<span className="font-medium ">Usuarios</span>
							</li>
						</Link>
					</ul>
				</div>
				<div>
					<Link to={"gestion_user"}>
							<div className={`text-gray-200 flex gap-3  hover:bg-white/5 px-5 py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300`}>
								<LogOut className="w-5 h-5 " />
								<span className="font-medium ">Salir</span>
							</div>
						</Link>
				</div>
			</div>
		</div>
	);
};
