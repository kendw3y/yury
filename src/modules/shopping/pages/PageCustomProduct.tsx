import type { CanvasElement, Product } from "@/types/Product";
import { products } from "@/data/products";
import { useCallback, useState } from "react";
import DesignArea from "../components/DesignArea";
import SeccionProduct from "../components/SeccionProduct";
type Props = {
  // product:Product
};

export const PageCustomProduct = ({}: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPersonalization, setSelectedPersonalization] =
    useState("TODOS");
  const [selectedArea, setSelectedArea] = useState("");
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [productDescription, setProductDescription] = useState("");
  const canvasWidth = 400;
  const canvasHeight = 300;
  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedArea(product.areas[0]);
    setCanvasElements([]);
    setSelectedElementId(null);
    setProductDescription("");
  }, []);
  const product = {
    id: "BOLSA-JAZZIN",
    name: "Bolsa Non-Woven JAZZIN",
    family: "HERO SERIGRAFIA",
    personalizacion: "SERIGRAFIA",
    areas: ["frente", "reverso"],
    coloresMax: 4,
    image: "/bolsa-jazzin.png",
    price: 3.5,
  };
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
