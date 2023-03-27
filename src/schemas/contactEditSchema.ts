import * as yup from "yup"

const contactEditSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email("Deve ser um e-mail válido").notRequired(),
  phone:  yup.string().notRequired()
})



export default contactEditSchema