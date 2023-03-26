import * as yup from "yup"

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  email: yup.string().email("Deve ser um e-mail válido").required("E-mail obrigatório"),
  password:  yup.string().required("Senha obrigatória")
})

export default registerSchema