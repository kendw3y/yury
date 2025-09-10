import * as yup from 'yup'

export const schema = yup.object({
    telefono: yup.string().required("Este campo es requerido"),
	contrasena: yup.string().required("Este campo es requerido"),
})