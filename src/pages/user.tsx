import HeaderDashboard from "@/components/Dashboard/headerDashboard"
import ModalDeleteUser from "@/components/UserPage/Modals/modalDeleteUser"
import ModalEditUser from "@/components/UserPage/Modals/modalEditUser"
import { useAuth } from "@/contexts/authContext"
import { Box, Button, Flex, List, ListItem, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import nookies from "nookies"
import { GetServerSideProps } from "next";
import { IDashboardProps, IUserResponse } from "@/types";
import { useEffect } from "react";
import api from "@/services/api"

const User = ({token, userId}: IDashboardProps) => {
  const {userFake, setUserInfo, userInfo, setUserFake} = useAuth()

  useEffect(() => {
    const response = async () => {
      api.defaults.headers.authorization = `Bearer ${token}`
      const res = await api.get(`/users/${userId}`)
      const userData: IUserResponse = res.data
      setUserInfo(userData)
    }
    response()
  }, [userFake])
  const router = useRouter()
  const backPage = () => {
    router.push("/dashboard")
  }
  return (
    <>
      <HeaderDashboard token={token} userId={userId}/>
      <Box padding={"10"}>
        <Flex gap={2}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Seus Dados</Text>
          <ModalEditUser token={token} userId={userId} setUserFake={setUserFake}/>
          <ModalDeleteUser token={token} userId={userId} setUserFake={setUserFake}/>
        </Flex>
        <List marginTop={"20px"}>
          <Flex flexDirection={"column"} gap={2}>
            <ListItem fontSize={"xl"}>Nome: {userInfo.name}</ListItem>
            <ListItem fontSize={"xl"}>Email: {userInfo.email}</ListItem>
            <ListItem fontSize={"xl"}>Telefone: {userInfo.phone}</ListItem>
          </Flex>
        </List>
        <Button marginTop={"30px"} variant={"default"} onClick={() => backPage()}>Voltar para Página Principal</Button>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies["desafio.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { 
        token: cookies["desafio.token"],
        userId: cookies["desafio.userId"]
    },
  };
};

export default User