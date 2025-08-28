import React from "react";
import { easeInOut, motion, useAnimationControls } from "framer-motion";

type Props = {
	onClick: () => void;
	active: boolean;
	name: string;
};

export const FilterButton = ({ active, name, onClick }: Props) => {
	const variant = {
		active: {
			color: "#1e2939",
			background: "#99a1af",
			outline: "2px solid #99a1af",
			outlineOffset: "2px",
		},
		inactive: {
			outlineWidth: "2px",
			outlineOffset: "2px",
            outlineColor: "#fff0",
			color: "#fff",
			background: "#1e2939",
		},
	};

	return (
		<motion.button
			variants={variant}
			animate={active ? "active" : "inactive"}
			transition={{
				duration: 0.3,
				ease: easeInOut,
				type: "tween",
			}}
			onClick={onClick}
			className={`px-6 py-2  font-medium  rounded-lg text-sm cursor-pointer`}
		>
			{name}
		</motion.button>
	);
};
