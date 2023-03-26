import * as yup from "yup"

const loginSchema = yup.object().shape({
  email: yup.string().email("Deve ser um e-mail válido").required("E-mail obrigatório"),
  password:  yup.string().required("Senha obrigatória")
})

export default loginSchema