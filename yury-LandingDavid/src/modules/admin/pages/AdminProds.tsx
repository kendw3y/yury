import React, { useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { useProductTable } from "@/modules/shopping/hooks/useProductTable";
import { FiltrosGenerales } from "@/modules/shopping/components/FiltrosGenerales";
import { AddProduct } from "../components/AddProduct";

const AdminProductsPage: React.FC = () => {
  const { table } = useProductTable();
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <div className="min-h-full py-4 px-10 flex flex-col gap-4 text-gray-300 font-nunito ">
        <h2 className="text-3xl font-bold text-center ">
          Gestión de productos
        </h2>
        <FiltrosGenerales tableState={table} />
        {/* Resultados */}
        <section className=" w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Botón para crear nuevo producto */}
            <div
              className="bg-[#1e2939af]  rounded-lg p-4 gap-4 shadow-lg hover:shadow-xl flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => setAddModal(true)}
            >
              <div className="aspect-square w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-600 group-hover:border-blue-500">
                <span className="text-6xl text-gray-500 group-hover:text-blue-500">
                  +
                </span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-400 group-hover:text-white">
                Agregar nuevo producto
              </h3>
            </div>
            {table.getRowModel().rows.map((product) => (
              <ProductItem
                key={product.original.id}
                product={product.original}
              />
            ))}
          </div>
        </section>
      </div>
      {addModal && <AddProduct onClouse={() => setAddModal(false)} />}
    </>
  );
};

export default AdminProductsPage;
