import { flexRender, type Header, type Row } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import type { Producto } from "@/modules/shopping/interfaces/interfaces";

type Props = {
  columnLabel: Header<any, unknown>[];
  data: Row<any>[];
  rowExpand: number[];
};

export const ListOrder = ({ columnLabel, data, rowExpand }: Props) => {
  return (
    <div className="w-full flex flex-col ">
      <div className="min-w-full bg-gray-900 overflow-x-auto rounded-lg ">
        {/* Encabezado */}
        <div className="grid grid-cols-6 bg-gray-800 text-gray-100 font-semibold ">
          {columnLabel.map((header) => (
            <div key={header.id} className="p-3 text-center">
              {header.column.getCanSort() ? (
                <div
                  className="flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-700 rounded p-1 transition-colors"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div className="flex flex-col">
                    {header.column.getIsSorted() === "desc" ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : header.column.getIsSorted() === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Filas */}
        {data.map((row, i, a) => {
          const isExpanded = rowExpand.includes(row.original.id);
          const Row = row.original;
          return (
            <div key={row.id} className="flex flex-col">
              {/* Fila principal */}
              <div
                className={`grid grid-cols-6 gap-0 ${
                  i !== a.length - 1 ? (isExpanded ? "" : "border-b-2") : ""
                } border-gray-800 transition-colors duration-150`}
              >
                {row.getAllCells().map((cell) => (
                  <div
                    key={cell.id}
                    className={`p-3 text-center   text-gray-100`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
              {/* Detalle  */}
              <motion.div
                initial={false}
                animate={isExpanded ? "open" : "closed"}
                variants={{
                  open: {
                    opacity: 1,
                    height: "auto",
                    overflow: "hidden",
                  },
                  closed: {
                    opacity: 0,
                    height: 0,
                    overflow: "hidden",
                  },
                }}
                transition={{
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, ease: "easeIn" },
                }}
                className="bg-gray-900 border-2 text-gray-100 border-gray-700 rounded-sm"
              >
                <div className="py-8 flex flex-col px-16">
                  <div className="flex flex-col">
                    <div className="flex justify-around border-b-1 py-1 text-gray-400 border-[#464f5e] ">
                      <div className="flex-4/5 pl-12">Producto</div>
                      <div className="flex-[15%] text-center">Cantidad</div>
                      <div className="flex-[15%] text-center">Precio</div>
                    </div>
                    {Row.productos.map((p: Producto) => (
                      <div className="flex justify-around items-center border-b-1 py-3 border-[#464f5e]">
                        <div className="flex-4/5 pl-6 flex gap-4 items-center">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12"
                          />
                          <span>{p.name}</span>
                        </div>
                        <div className="flex-[15%] text-center">
                          {p.quantity}
                        </div>
                        <div className="flex-[15%] text-center">{p.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end ">
                    <div className="w-[27%] flex flex-col gap-2 py-2">
                      <div className="flex  ">
                        <span className="flex-1 text-gray-400 text-center">
                          Subtotal
                        </span>
                        <span className="flex-1 text-center">300</span>
                      </div>
                      <div className="flex ">
                        <span className="flex-1 text-gray-400 text-center">
                          Envío
                        </span>
                        <span className="flex-1 text-center">198</span>
                      </div>
                      <div className="flex ">
                        <span className="flex-1 text-gray-400 text-center">
                          Total
                        </span>
                        <span className="flex-1 text-center">19</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
