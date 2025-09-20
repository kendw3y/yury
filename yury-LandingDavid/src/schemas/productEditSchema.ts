
import * as yup from 'yup'

export const schema = yup.object({
    name: yup.string().required('El nombre del producto es obligatorio'),
    description: yup.string().required('La descripción del producto es obligatoria'),
    price: yup.number()
        .transform((_, originalValue) => {
            // Convertir string a number, si es string vacío retornar undefined
            if (originalValue === '') return undefined;
            return Number(originalValue);
        })
        .typeError('El precio debe ser un número válido')
        .positive('El precio debe ser mayor a 0')
        .required('El precio es obligatorio'),
    category: yup.string().required('Debe seleccionar una categoría'),
    image: yup.string().required('Debe agregar una imagen del producto'),
    isCoustom: yup.boolean()
        .transform((_, originalValue) => {
            // Convertir string "true"/"false" a boolean
            if (originalValue === 'true') return true;
            if (originalValue === 'false') return false;
            return originalValue;
        })
        .required('Debe especificar si el producto es personalizable'),
})