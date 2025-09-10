import { CoustomButton, Modal } from "@/components";
import { ChevronDown, X } from "lucide-react";
import  { useState } from "react";

type Props = {
  rowId: number;
  isExpanded: boolean;
  handleExpand: () => void;
  handleDelete: () => void;
};

export const ActionButtonsFormOrder = ({
  
  handleExpand,
  isExpanded,
  handleDelete,
}: Props) => {
  const [deletModal, setDeletModal] = useState(false);
  return (
    <div className="flex gap-3 justify-center items-center">
      <button
        onClick={handleExpand}
        className="bg-gray-800 text-gray-50 px-2 py-1 rounded-lg cursor-pointer"
      >
        <ChevronDown
          className={`${
            isExpanded ? "rotate-180" : ""
          } w-5 h-5 transition-all ease-in-out duration-300 `}
        />
      </button>
      <div>
        <button
          onClick={() => setDeletModal(true)}
          title="Eliminar encargo"
          className="bg-gray-800 text-gray-50 px-2 py-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5"></X>
        </button>
        <Modal
          handleIsOpen={() => setDeletModal(false)}
          isOpen={deletModal}
          tittle="Eliminar"
        >
          <div className="flex flex-col gap-4">
            <p>¿Estás seguro que desea eliminar este encargo?</p>
            <div className="flex justify-between items-center">
              <CoustomButton
                handleOnClick={() => {
                  handleDelete();
                  setDeletModal(false);
                }}
                hoverColor="#f54927"
                colorButton="#F54927ab"
                tittleButton="Eliminar"
              />
              <CoustomButton
                handleOnClick={() => setDeletModal(false)}
                colorButton="#335ac673"
                hoverColor="#335ac6cb"
                tittleButton="Cancelar"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
