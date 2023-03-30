import {
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
  Box,
  useToast,
  Flex,
} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { IEditUser, IModalEditProps } from "@/types"
import editUserSchema from "@/schemas/editUserSchema"
import api from "@/services/api"

const ModalEditUser = ({token, userId}: IModalEditProps) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputName, setInputName] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const emailError = inputEmail === ""
  const passwordError = inputPassword === ""

  const {
    register,
    handleSubmit,
    formState: {errors}  
  } = useForm<IEditUser>({
      resolver: yupResolver(editUserSchema)
  })
    
    const onFormSubmit = (formData:IEditUser) => {
      const {email, name, phone, password} = formData
      const userData: IEditUser = {}
      if (email !== "" || name !== "" || phone !== "" || password !== "") {
        if (email !== "") {
          userData.email = email
        }
        if (name !== "") {
          userData.name = name
        }
        if (phone !== "") {
          userData.phone = phone
        }
        if (password !== "") {
          userData.password = password
        }
        try {
          api.defaults.headers.authorization = `Bearer ${token}`
          api.patch(`/users/${userId}`, userData)
          toast({
            title: "sucess",
            position: "top-right",
            isClosable: true,
            duration: 2000,
            render: () => (
              <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
                Contato alterado com sucesso!
              </Box>
            ),
          })
          } catch (err){
            toast({
              title: 'error',
              position: 'top-right',
              isClosable: true,
              duration: 3000,
              render: () => (
                  <Box color={'gray.50'} p={3} bg={'red.600'} fontWeight={'bold'} borderRadius={'md'}>
                    Erro ao alterar o contato, tente novamente
                  </Box>
                ),
          })
            console.log(err)
          } finally {
            onClose()
          }
      }
      if (email === "" && name === "" && phone === "" && password === "") {
        toast({
          title: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          render: () => (
              <Box color={'gray.50'} p={3} bg={'red.600'} fontWeight={'bold'} borderRadius={'md'}>
                Insira os dados para alterar
              </Box>
            ),
      })
      }
    }

    return (
      <>
      <Button cursor={"pointer"} onClick={onOpen} variant={"modalAdd"}>
        <EditIcon/>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>Alterar seus dados</ModalHeader>

        <ModalBody>

        <FormControl id="email">
          <FormLabel>E-mail</FormLabel>
          <Input focusBorderColor="blue.300" type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
          <span>{errors.email?.message}</span>
        </FormControl>

        <FormControl>
        <FormControl id="name">
          <FormLabel>Nome</FormLabel>
          <Input required focusBorderColor="blue.300" type="text" {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
          </FormControl>
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Telefone</FormLabel>
          <Input required focusBorderColor="blue.300" type="text" {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
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
        <Flex gap={2}>
          <Button onClick={handleSubmit(onFormSubmit)} variant={"default"}>Alterar</Button>
          <Button onClick={onClose} variant={"cancel"}>Cancelar</Button>
        </Flex>
        </ModalFooter>

      </ModalContent>

      </Modal>
      </>
    )
  }

export default ModalEditUser;