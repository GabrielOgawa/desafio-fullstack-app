import api from "@/services/api";
import { IProviderProps, IUserLogin, IUserResponse } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { setCookie } from "nookies";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"

interface AuthProviderData {
  login: (data: IUserLogin) => void;
  userInfo: IUserResponse | {};
  setUserFake: Dispatch<SetStateAction<boolean>>;
  token: string;
  userId: number | undefined;
  setUserInfo: Dispatch<SetStateAction<{} | IUserResponse>>;
  userFake: boolean;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData)

export const AuthProvider = ({children}: IProviderProps) => {
  const toast = useToast()
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<IUserResponse | {}>({})
  const [userId, setUserId] = useState<number>()
  const [userFake, setUserFake] = useState<boolean>(false)
  const [token, setToken] = useState<string>("")

  const login = (data: IUserLogin) => {
    api.post("/login", data)
    .then(async (res) => {
      setCookie(null, "desafio.token", res.data.token, {maxAge: 60 * 60, path: "/"})
      setCookie(null, "desafio.userName", res.data.userName, {maxAge: 60 * 60, path: "/"})
      setCookie(null, "desafio.userId", res.data.userId, {maxAge: 60 * 60, path: "/"})
      setToken(res.data.token)
      setUserId(res.data.userId)
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
    <AuthContext.Provider value={{login, userInfo, setUserFake, token, userId, setUserInfo, userFake }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)