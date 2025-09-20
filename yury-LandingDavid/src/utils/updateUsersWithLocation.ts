import { provinciasYMunicipios } from "@/data/provinciasymunicipios";

// Función para obtener una provincia aleatoria
export const getRandomProvincia = (): string => {
  const provincias = Object.keys(provinciasYMunicipios);
  return provincias[Math.floor(Math.random() * provincias.length)];
};

// Función para obtener un municipio aleatorio de una provincia
export const getRandomMunicipio = (provincia: string): string => {
  const municipios = provinciasYMunicipios[provincia];
  if (!municipios || municipios.length === 0) return "";
  return municipios[Math.floor(Math.random() * municipios.length)];
};

// Función para obtener provincia y municipio aleatorios
export const getRandomLocation = (): { provincia: string; municipio: string } => {
  const provincia = getRandomProvincia();
  const municipio = getRandomMunicipio(provincia);
  return { provincia, municipio };
};

// Función para actualizar usuarios sin provincia/municipio
export const updateUsersWithRandomLocation = (users: any[]) => {
  return users.map(user => {
    // Si el usuario no tiene provincia o municipio, agregar datos aleatorios
    if (!user.provincia || !user.municipio) {
      const { provincia, municipio } = getRandomLocation();
      return {
        ...user,
        provincia,
        municipio
      };
    }
    return user;
  });
};