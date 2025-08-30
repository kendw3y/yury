import React from "react";
import { FiltrosGenerales } from "../components/FiltrosGenerales";
import { ProductCard } from "../components/ProductCard";
import { useProductTable } from "../hooks/useProductTable";


const UserProductsPage: React.FC = () => {
	const {table} = useProductTable()

	return (
		<div className="min-h-full  py-4 px-10 text-white flex flex-col gap-4 font-nunito">
			<FiltrosGenerales tableState={table} />
			{/* Resultados */}
			<section className=" flex flex-col gap-3 py-3">
				<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{table.getRowModel().rows.map(product => (
						<ProductCard key={product.original.id} product={product.original} />
					))}
				</div>
			</section>
		</div>
	);
};

export default UserProductsPage;
