import * as yup from "yup"

const contactEditSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email("Deve ser um e-mail válido").notRequired(),
  phone:  yup.string().notRequired()
})

const contactSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Deve ser um e-mail válido").required(),
  phone:  yup.string().required("Telefone obrigatório")
})

export default contactEditSchema