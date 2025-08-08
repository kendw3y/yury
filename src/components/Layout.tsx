import { Outlet } from "react-router-dom";
import Header from "./head";

export const Layout = () => {
	return (
		<div className="nunito-normal flex flex-col bg-background">
			<Header />
			<div className="pt-20 ">
				<Outlet></Outlet>
			</div>
		</div>
	);
};
