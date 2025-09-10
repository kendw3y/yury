
import * as yup from 'yup'

export const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    image: yup.string().required(),
    isCoustom: yup.boolean().required(),
})