import { Link } from "react-router-dom";

type Props = {
    tittle: string,
    description: string,
    linkToNavigate: string
    colorGradient: "blue" | "yellow" | "pink"

};

export const CategoryCard = ({colorGradient,description,linkToNavigate,tittle}: Props) => {
	const getGradient = () => {
		switch(colorGradient){
			case "blue":
				return "from-blue-400 to-blue-800"
			case "pink":
				return "from-pink-600 to-pink-800"
			case "yellow":
				return "from-yellow-400 to-yellow-600"
		}
	}
	return (
		<div
			className={`flex-1  bg-gradient-to-r ${getGradient()} hover:bg-blue-dark cursor-pointer  group transition-all duration-500 ease-in-out`}
			onClick={() => {}}
		>
			<div className=" h-full flex items-center justify-center p-6">
				<div className="text-center text-white transition-all duration-500 group-hover:scale-105">
					<h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-3xl group-hover:mb-4">
						{/* Artículos Promocionales */}
                        {tittle}
					</h3>
					<p className="text-lg opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:text-xl">
						{/* Pulóveres, Tazas, Gorras y más */}
                        {description}
					</p>
					<div className="mt-4  transition-opacity duration-500 transform  ">
						<Link
							to={linkToNavigate}
							className={`px-6 py-2 bg-white text-${colorGradient}-800 rounded-full font-medium shadow-md hover:shadow-lg transition-all`}
						>
							Ver productos
						</Link>
					</div>
				</div>
			</div>
			<div className=" h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
		</div>
	);
};
