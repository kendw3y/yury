import * as yup from 'yup'

export const schema = yup.object({
    nombre_apellidos: yup.string().required("Este campo es requerido").max(50,"El máximo de caracteres es 50"),
    telefono: yup.string().required("Este campo es requerido"),
    correo: yup
        .string()
        .email("El correo electrónico no es válido")
        .required("Este campo es requerido"),
    entidad: yup.string().required("Este campo es requerido"),
    contrasena: yup.string().required("Este campo es requerido"),
    direccion: yup.string().required("Este campo es requerido"),
    conf_contrasena: yup
        .string()
        .oneOf([yup.ref("contrasena")], "Las contraseñas deben coincidir")
        .required("Este campo es requerido"),
});