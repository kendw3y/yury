import { mainCategories } from "@/data/categorias";
import type { Producto } from "@/modules/shopping/interfaces/interfaces";
import { useState } from "react";
import { CoustomButton } from "../../../components/CoustomButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/schemas/productEditSchema";
import { ImageUploadButton } from "../../../components/InputImg";

type Props = {
  product: Producto;
  onClouse: () => void;
};

export const EditProduct = ({ product, onClouse }: Props) => {
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setEdit(false);
  });

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center w-screen h-screen  backdrop-blur-sm">
      {/* Modal */}
      <div className="bg-gray-800 rounded-xl shadow-2xl w-[90%] max-w-3xl h-[90vh] flex flex-col sm:flex-row overflow-hidden animate-scaleIn">
        
        {/* Imagen - Lado izquierdo */}
        <div className="relative w-full sm:w-1/2 h-64 sm:flex-2 sm:h-auto">
          <ImageUploadButton 
            onImageUpload={() => {}} 
            imageUrl={product.image} 
            className="w-full h-full rounded-l-xl sm:rounded-none" 
          />
          
          {/* Botón de cerrar */}
          <button
            onClick={onClouse}
            className="absolute top-2 right-2 bg-gray-100/70  text-gray-800 cursor-pointer text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-opacity-90 transition z-10"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Formulario - Lado derecho */}
        <div className="flex flex-col  p-4 sm:p-6 overflow-y-auto flex-1">
          <form onSubmit={onSubmit} className="flex flex-col  gap-5 ">
            {/* Nombre */}
            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-300">Nombre:</label>
              <input
                disabled={!edit}
                defaultValue={product.name}
                {...register("name")}
                className="font-bold py-2 px-3 bg-[#29374ddc] disabled:bg-transparent w-full border-2 border-[#29374ddc] rounded-lg focus:outline-none"
              />
              {errors.name && (
                <span className="text-red-400 text-sm">{errors.name.message}</span>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">Descripción:</label>
              <input
                disabled={!edit}
                defaultValue={product.description}
                {...register("description")}
                className="font-bold py-2 px-3 bg-[#29374ddc] disabled:bg-transparent w-full border-2 border-[#29374ddc] rounded-lg focus:outline-none"
              />
              {errors.description && (
                <span className="text-red-400 text-sm">{errors.description.message}</span>
              )}
            </div>

            {/* Precio */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">Precio:</label>
              <input
                disabled={!edit}
                defaultValue={product.price}
                {...register("price")}
                className="font-bold py-2 px-3 bg-[#29374ddc] disabled:bg-transparent w-full border-2 border-[#29374ddc] rounded-lg focus:outline-none"
              />
              {errors.price && (
                <span className="text-red-400 text-sm">{errors.price.message}</span>
              )}
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">Categoría:</label>
              <select
                disabled={!edit}
                defaultValue={product.category}
                {...register("category")}
                className="py-2 px-3 bg-[#29374ddc] disabled:bg-transparent w-full border-2 border-[#29374ddc] rounded-lg focus:outline-none"
              >
                {mainCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-400 text-sm">{errors.category.message}</span>
              )}
            </div>

            {/* Botón Guardar (solo en modo edición) */}
            {edit && (
              <div className="pt-2">
                <CoustomButton
                  type="submit"
                  tittleButton="Guardar cambios"
                  colorButton="#335ac673"
                  hoverColor="#335ac6cb"
                />
              </div>
            )}
          </form>

          {/* Botón Editar (modo vista) */}
          {!edit && (
            <div className="pt-4 mt-auto">
              <CoustomButton
                type="button"
                tittleButton="Editar"
                colorButton="#fccf085d"
                hoverColor="#fccf08cb"
                handleOnClick={() => setEdit(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};