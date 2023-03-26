import {
  Box,
  Button,
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
import registerSchema from "@/schemas/registerSchema"
import api from "@/services/api"

const ModalRegister = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [inputName, setInputName] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")

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
    })
    .catch((err) => {
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
      <Button onClick={onOpen}>Registro</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar conta</ModalHeader>
          <ModalBody>
            <FormControl id="name" isRequired isInvalid={nameError}>
              <FormLabel>Nome</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="text" {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
              {!nameError ? (
                  <FormHelperText>  
                  Digite seu e-mail
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.name?.message}
                  </FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="phone" isRequired isInvalid={phoneError}>
              <FormLabel>Telefone</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="text" {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
              {!phoneError ? (
                  <FormHelperText>  
                  Digite seu e-mail
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.phone?.message}
                  </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
              {!emailError ? (
                  <FormHelperText>  
                  Digite seu e-mail
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.email?.message}
                  </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                        <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="password" {...register("password")} onChange={(e) => setInputPassword(e.target.value)}/>
                    </InputGroup>
                    {!passwordError ? (
                        <FormHelperText>  
                        Digite sua senha
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>
                        {errors.password?.message}
                        </FormErrorMessage>
                    )}
          </FormControl>
          </ModalBody>
          <ModalFooter>
                <Button
                  size="lg"
                  variant={"default"}
                  onClick={handleSubmit(onFormSubmit)}
                  _hover={{
                    bg: 'blue.500',
                    fontWeight: "bold"
                  }}>
                    Criar
                </Button>
                <Button
                size="lg"
                _hover={{
                  bg: 'red.600',
                  fontWeight: "bold"
                }}
                onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)
}

export default ModalRegister;