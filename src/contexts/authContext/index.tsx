import api from "@/services/api";
import { IProviderProps, IUserLogin } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";
import { useRouter } from "next/router"

interface AuthProviderData {
  login: (data: IUserLogin) => void
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData)

export const AuthProvider = ({children}: IProviderProps) => {
  const toast = useToast()
  const router = useRouter()
  const login = (data: IUserLogin) => {
    api.post("/login", data)
    .then((res) => {
      setCookie(null, "desafio.token", res.data.token, {maxAge: 60 * 60, path: "/"})
      setCookie(null, "desafio.userName", res.data.userName, {maxAge: 60 * 60, path: "/"})
      setCookie(null, "desafio.userId", res.data.userId, {maxAge: 60 * 60, path: "/"})
      toast({
        title: "sucess",
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
            Login realizado com sucesso!
          </Box>
        ),
      })
      router.push('/dashboard')
    })
    .catch((err) => {
      toast({
        title: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
        render: () => (
            <Box color={'gray.50'} p={3} bg={'red.600'} fontWeight={'bold'} borderRadius={'md'}>
              E-mail ou senha incorretos
            </Box>
          ),
    })
    })
  }
  return (
    <AuthContext.Provider value={{login}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)