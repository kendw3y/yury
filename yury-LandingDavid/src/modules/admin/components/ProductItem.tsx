import { CoustomButton, Modal } from "@/components";
import type { Producto } from "@/modules/shopping/interfaces/interfaces";
import { Trash } from "lucide-react";
import { useState } from "react";
import { EditProduct } from "./EditProduct";
import { useProduct } from "../hooks/useProducts";

type Props = {
	product: Producto;
};

export const ProductItem = ({ product }: Props) => {
	const [showModal,setShowModal] = useState(false)
	const [deletModal, setDeletModal] =useState(false)
	const { deleteProductMutation } = useProduct();
	
	const handleDeleteProduct = async () => {
		try {
			await deleteProductMutation.mutateAsync(product.id);
			setDeletModal(false);
			// Mostrar mensaje de éxito (opcional)
			alert('Producto eliminado exitosamente');
		} catch (error) {
			console.error('Error al eliminar producto:', error);
			alert('Error al eliminar el producto. Por favor intenta de nuevo.');
		}
	};
	
	return (
		<>
			<div
				key={product.id}
				className="bg-[#1e2939af]  rounded-lg p-4 shadow-lg  flex flex-col justify-between"
			>
				<div className="flex flex-col gap-2">
					<div className="relative aspect-square overflow-hidden rounded-lg  ">
						<img
						onClick={() =>setShowModal(true)}
							src={product.image}
							alt={product.name}
							className="w-full h-full cursor-pointer  object-cover hover:scale-105 transition-transform"
						/>
						
						
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-bold ">{product.name}</h3>
						<p className="text-gray-300 ">{product.description}</p>
						<p className="text-lg font-bold text-accent "> {product.price} CUP</p>
					</div>
				</div>

				<div className="flex gap-3  ">
					
					<button
						onClick={() => setDeletModal(true)}
						title="Eliminar producto"
						className="w-full py-2 flex gap-2 justify-center items-center bg-[#d40c636e] hover:bg-[#d40c63cb] rounded-lg transition-colors ease-in-out duration-300 cursor-pointer"
					>
						<Trash className="w-5 h-5  " />
						<span>Eliminar</span>
					</button>
					<Modal handleIsOpen={()=>setDeletModal(false)} isOpen={deletModal} tittle="Eliminar">
									<div className="flex flex-col gap-4">
										<p>¿Estás seguro que desea eliminar este producto?</p>
										<div className="flex justify-between items-center">
											<CoustomButton 
												handleOnClick={handleDeleteProduct} 
												hoverColor="#f54927" 
												colorButton="#F54927ab" 
												tittleButton={deleteProductMutation.isPending ? "Eliminando..." : "Eliminar"}
												disable={deleteProductMutation.isPending}
											/>
											<CoustomButton
												handleOnClick={()=>setDeletModal(false)}
												colorButton="#335ac673"
												hoverColor="#335ac6cb"
												tittleButton="Cancelar"
											/>
										</div>
									</div>
								</Modal>
				</div>
			</div>
			{showModal&&<EditProduct product={product} onClouse={() => setShowModal(false)}/>}
		</>
	);
};
