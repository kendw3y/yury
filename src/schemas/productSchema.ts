import * as yup from 'yup'

export const schema = yup.object({
    full_name: yup.string().required("Este campo es requerido").max(40,"El máximo de caracteres es 40"),
	phone: yup.string().required("Este campo es requerido"),
	email: yup.string().email("Email no válido").required("Este campo es requerido"),
	address: yup.string().required("Este campo es requerido"),
	provincia: yup.string().required("Este campo es requerido"),
	municipio: yup.string().required("Este campo es requerido"),
})