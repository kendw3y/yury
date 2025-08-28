import React from "react";
import { FiltrosGenerales } from "../components/FiltrosGenerales";
import { ProductCard } from "../components/ProductCard";
import { useProductTable } from "../hooks/useProductTable";


const UserProductsPage: React.FC = () => {
	const {table} = useProductTable()

	return (
		<main className="min-h-screen bg-primary text-white flex flex-col gap-3 font-nunito">
			<FiltrosGenerales tableState={table} page="ecommers"/>

			{/* Resultados */}
			<section className="px-6 flex flex-col gap-3 pb-4">
				<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{table.getRowModel().rows.map(product => (
						<ProductCard key={product.original.id} product={product.original} />
					))}
				</div>
			</section>

			{/* Modal de vista rápida */}
			
		</main>
	);
};

export default UserProductsPage;
