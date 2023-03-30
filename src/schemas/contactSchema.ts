import * as yup from "yup"

const contactSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Deve ser um e-mail válido").required("Email obrigatório"),
  phone:  yup.string().required("Telefone obrigatório")
})

export default contactSchema;