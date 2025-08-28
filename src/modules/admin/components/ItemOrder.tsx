import type { Encargo } from "@/types/Product";
import React from "react";

type Props = {
	order: Encargo;
};

export const ItemOrder = ({ order }: Props) => {
	return (
		<div className="grid grid-cols-6 gap-0  transition-colors duration-150">
			<div className="p-3 text-center text-sm text-gray-100 border-b border-gray-700">Ana Pérez</div>
			<div className="p-3 text-center text-sm text-gray-100 border-b border-gray-700">28</div>
			<div className="p-3 text-center text-sm text-gray-100 border-b border-gray-700">
				ana@example.com
			</div>
			<div className="p-3 text-center text-sm text-gray-100 border-b border-gray-700">España</div>
			<div className="p-3 text-center text-sm text-green-100 border-b border-gray-700">Activo</div>
			<div className="p-3 text-center">
				<button className="text-gray-100 hover:underline text-sm">Ver</button>
			</div>
		</div>
	);
};
