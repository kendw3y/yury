import type { CanvasElement, Product } from "@/types/Product";
import { products } from "@/data/products";
import { useCallback, useState, useEffect } from "react";
import DesignArea from "../components/DesignArea";
import SeccionProduct from "../components/SeccionProduct";
import { useParams } from "react-router-dom";
import { useProduct } from "@/modules/admin/hooks/useProducts";
import type { Producto } from "../interfaces/interfaces";

type Props = {
  // product:Product
};

// Función para convertir Producto a Product
const convertProductoToProduct = (producto: Producto): Product => {
  return {
    id: producto.id.toString(),
    name: producto.name,
    family: "HERO SERIGRAFIA", // Default value
    personalizacion: "SERIGRAFIA", // Default value  
    areas: ["frente", "reverso"], // Default areas
    coloresMax: 4, // Default value
    image: producto.image,
    price: typeof producto.price === "string" ? parseFloat(producto.price) : producto.price
  };
};

export const PageCustomProduct = ({}: Props) => {
  const { productId } = useParams<{ productId: string }>();
  const { products: productosBackend } = useProduct();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPersonalization, setSelectedPersonalization] = useState("TODOS");
  const [selectedArea, setSelectedArea] = useState("");
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [productDescription, setProductDescription] = useState("");
  
  const canvasWidth = 400;
  const canvasHeight = 300;

  // Efecto para preseleccionar el producto basado en el ID de la URL
  useEffect(() => {
    if (productId && productosBackend.length > 0) {
      const productIdNumber = parseInt(productId);
      const productoEncontrado = productosBackend.find(p => p.id === productIdNumber);
      
      if (productoEncontrado) {
        const productConverted = convertProductoToProduct(productoEncontrado);
        setSelectedProduct(productConverted);
        setSelectedArea(productConverted.areas[0]);
        setCanvasElements([]);
        setSelectedElementId(null);
        setProductDescription("");
      }
    }
  }, [productId, productosBackend]);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedArea(product.areas[0]);
    setCanvasElements([]);
    setSelectedElementId(null);
    setProductDescription("");
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex gap-4 w-[96%] h-[92%] ">
        <aside className="flex flex-col w-64  bg-gray-900 rounded-lg shadow text-gray-200">
          <SeccionProduct
            products={products}
            selectedProduct={selectedProduct}
            onProductSelect={handleProductSelect}
            selectedPersonalization={selectedPersonalization}
            onPersonalizationChange={setSelectedPersonalization}
          />
        </aside>
        <div className="flex flex-col items-center gap-4 h-full flex-1">
          <nav className=" h-10 flex  items-center ">
            <div className="w-80 h-full rounded-lg bg-gray-900 shadow"></div>
            <div></div>
          </nav>
          <div className="h-full">
            <DesignArea
              elements={canvasElements}
              onElementsChange={setCanvasElements}
              selectedElementId={selectedElementId}
              onElementSelect={setSelectedElementId}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
