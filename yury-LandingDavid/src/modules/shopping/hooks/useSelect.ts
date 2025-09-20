import { provinciasYMunicipios } from "@/data/provinciasymunicipios";
import { useEffect, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

export const useSelect = (provincia:string | undefined) => {
    const [municipios, setMunicipios] = useState<SelectOption[]>([])

    const provincias: SelectOption[] = Object.keys(provinciasYMunicipios).map(
        (provincia) => ({
          value: provincia,
          label: provincia,
        })
      );

      useEffect(() => {
        const new_municipios: SelectOption[] = provincia
          ? provinciasYMunicipios[provincia].map((municipio) => ({
              value: municipio,
              label: municipio,
            }))
          : [];
          setMunicipios(new_municipios)
          
      }, [provincia])
      
      
    return {
        provincias,
        municipios
    }
}