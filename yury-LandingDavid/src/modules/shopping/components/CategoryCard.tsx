type Props = {
    tittle: string,
    description: string,
    colorGradient: "blue" | "yellow" | "pink"

};

export const CategoryCard = ({colorGradient,description,tittle}: Props) => {
	const getGradient = () => {
		switch(colorGradient){
			case "blue":
				return "from-blue/80 via-blue to-blue/90"
			case "pink":
				return "from-pink/80 via-pink to-pink/90"
			case "yellow":
				return "from-yellow/80 via-yellow to-yellow/90"
		}
	}

	const getIcon = () => {
		switch(colorGradient){
			case "blue":
				return ""
			case "pink":
				return ""
			case "yellow":
				return ""
		}
	}

	return (
		<div className="group relative h-80 lg:h-96 overflow-hidden rounded-3xl cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
			{/* Background con gradiente */}
			<div className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`}></div>
			
			{/* Efectos decorativos */}
			<div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
			<div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:bg-white/20 transition-all duration-700"></div>
			
			{/* Patrón decorativo */}
			<div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
				 style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
			</div>

			{/* Contenido */}
			<div className="relative h-full flex flex-col justify-center items-center p-8 text-center text-white">
				{/* Icono */}
				<div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
					{getIcon()}
				</div>
				
				{/* Título */}
				<h3 className="text-2xl lg:text-3xl font-bold mb-4 transform group-hover:translate-y-[-4px] transition-all duration-300">
					{tittle}
				</h3>
				
				{/* Descripción */}
				<p className="text-lg lg:text-xl opacity-90 group-hover:opacity-100 transform group-hover:translate-y-[-2px] transition-all duration-300 leading-relaxed">
					{description}
				</p>
			</div>

			{/* Borde animado en hover */}
			<div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-500"></div>
			
			{/* Efecto de brillo en hover */}
			<div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/0 to-white/5 group-hover:via-white/10 group-hover:to-white/20 transition-all duration-500 rounded-3xl"></div>
		</div>
	);
};
