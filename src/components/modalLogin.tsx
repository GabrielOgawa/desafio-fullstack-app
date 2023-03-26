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
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
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
                    Entrar
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

export default ModalLogin;