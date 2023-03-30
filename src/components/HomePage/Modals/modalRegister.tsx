import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { IUserRegister } from "@/types"
import api from "@/services/api"
import registerSchema from "@/schemas/registerUserSchema"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const ModalRegister = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [inputName, setInputName] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const nameError = inputName === ""
  const phoneError = inputPhone === ""
  const emailError = inputEmail === ""
  const passwordError = inputPassword === ""

  const {
    register,
    handleSubmit,
    formState: {errors}  
  } = useForm<IUserRegister>({
      resolver: yupResolver(registerSchema)
  })

  const toast = useToast()

  const onFormSubmit = (formData:IUserRegister) => {
    api.post("/users", formData)
    .then((res) => {
      toast({
        title: "sucess",
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
            Usuário criado com sucesso!
          </Box>
        ),
      })
      onClose()
    })
    .catch((err) => {
      console.log(err)
      toast({
        title: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
        render: () => (
            <Box color={'gray.50'} p={3} bg={'red.600'} fontWeight={'bold'} borderRadius={'md'}>
              Erro ao criar o usuário, tente novamente
            </Box>
          ),
    })
    })
}
  return(
    <>
      <Button onClick={onOpen} variant={"default"} fontSize={"lg"}>Registro</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar conta</ModalHeader>
          <ModalBody>
            <FormControl id="name" isRequired isInvalid={nameError}>
              <FormLabel>Nome</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="text" {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
              <span>{errors.name?.message}</span>
              </FormControl>
            <FormControl id="phone" isRequired isInvalid={phoneError}>
              <FormLabel>Telefone</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="text" {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
              <span>{errors.phone?.message}</span>
            </FormControl>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
              <span>{errors.email?.message}</span>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                        <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type={showPassword ? 'text' : 'password'} {...register("password")} onChange={(e) => setInputPassword(e.target.value)}/>
                        <InputRightElement>
                          <Button onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                          </Button>
                        </InputRightElement>
                    </InputGroup>
                    <span>{errors.password?.message}</span>
          </FormControl>
          </ModalBody>
          <ModalFooter>
                <Flex justifyContent={"flex-end"} gap={2}>
                  <Button
                    variant={"default"}
                    onClick={handleSubmit(onFormSubmit)}>
                      Criar
                  </Button>
                  <Button
                  variant={"cancel"}
                  onClick={onClose}>
                      Cancel
                  </Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)
}

export default ModalRegister;