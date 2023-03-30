import {
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
} from "@chakra-ui/react"
import { useState } from "react"
import { IUserLogin } from "@/types"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import loginSchema from "@/schemas/loginSchema"
import { useAuth } from "@/contexts/authContext"

const ModalLogin = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const {login} = useAuth()
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const emailError = inputEmail === ""
  const passwordError = inputPassword === ""

  const {
    register,
    handleSubmit,
    formState: {errors}  
  } = useForm<IUserLogin>({
      resolver: yupResolver(loginSchema)
  })
  
  const onFormSubmit = (formData:IUserLogin) => {
      login(formData)
  }

  return(
    <>
      <Button onClick={onOpen} variant={"default"} fontSize={"lg"}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
              <span>{errors.email?.message}</span>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                        <Input required focusBorderColor="blue.300" errorBorderColor='red.300' type={showPassword ? 'text' : 'password'} {...register("password")} onChange={(e) => setInputPassword(e.target.value)}/>
                        <InputRightElement h={'full'}>
                            <Button
                            variant={'ghost'}
                            onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <span>{errors.password?.message}</span>
          </FormControl>
          </ModalBody>
          <ModalFooter>
                <Flex w={"100%"} justifyContent={"flex-end"} gap={2} >
                  <Button
                    variant={"default"}
                    onClick={handleSubmit(onFormSubmit)}>
                      Entrar
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

export default ModalLogin;