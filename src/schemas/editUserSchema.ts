import * as yup from "yup"

const editUserSchema = yup.object().shape({
  name: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().email("Deve ser um e-mail válido").notRequired(),
  password:  yup.string().notRequired()
})

export default editUserSchema