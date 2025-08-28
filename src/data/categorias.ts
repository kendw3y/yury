export interface Categories {
    id: string,
    name: string,
    color: string,
    subcategories: string[]
}

export const mainCategories: Categories[] = [
    { id: 'ropa-textiles', name: 'Ropa y Textiles', color: 'accent', subcategories: ['Camisetas', 'Sudaderas', 'Gorras', 'Bolsos tela'] },
    { id: 'bolsas-mochilas', name: 'Bolsas y Mochilas', color: 'accent', subcategories: ['Mochilas', 'Bolsas tela', 'Bolsas algodón'] },
    { id: 'botellas-bebidas', name: 'Botellas y Bebidas', color: 'yellow', subcategories: ['Botellas agua', 'Termos', 'Vasos térmicos'] },
    { id: 'tecnologia', name: 'Tecnología Personalizable', color: 'pink', subcategories: ['Fundas móvil', 'Power banks', 'Pulseras inteligentes'] },
    { id: 'accesorios-personales', name: 'Accesorios Personales', color: 'pink', subcategories: ['Llaveros', 'Gafas sol', 'Gorras'] },
    { id: 'tazas-vasos', name: 'Tazas y Vasos', color: 'yellow', subcategories: ['Tazas cerámica', 'Vasos impresos', 'Juegos de tazas'] },
    { id: 'oficina', name: 'Artículos de Oficina', color: 'accent', subcategories: ['Agendas', 'Bolígrafos', 'Soportes móvil'] },
    { id: 'papeleria', name: 'Papelería y Cuadernos', color: 'accent', subcategories: ['Cuadernos', 'Postales', 'Notas adhesivas'] },
];