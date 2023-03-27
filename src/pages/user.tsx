import HeaderDashboard from "@/components/Dashboard/headerDashboard"
import ModalEditUser from "@/components/modalEditUser"
import api from "@/services/api"
import { IUserProps, IUserResponse } from "@/types"
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import nookies from "nookies"

const User = ({token, userId, user}: IUserProps) => {
  return (
    <>
      <HeaderDashboard userName={user.name}/>
      <Box padding={"10"}>
        <Flex gap={2}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Seus Dados</Text>
          <ModalEditUser token={token} userId={userId}/>
        </Flex>
        <List marginTop={"20px"}>
          <Flex flexDirection={"column"} gap={2}>
            <ListItem fontSize={"xl"}>Nome: {user.name}</ListItem>
            <ListItem fontSize={"xl"}>Email: {user.email}</ListItem>
            <ListItem fontSize={"xl"}>Telefone: {user.phone}</ListItem>
          </Flex>
        </List>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  if(!cookies["desafio.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  api.defaults.headers.authorization = `Bearer ${cookies["desafio.token"]}`;
  const res = await api.get(`/users/${cookies["desafio.userId"]}`)
  const userData: IUserResponse = res.data
  return {
    props: {userId: cookies["desafio.userId"], token: cookies["desafio.token"], user: userData}
  }
}

export default User