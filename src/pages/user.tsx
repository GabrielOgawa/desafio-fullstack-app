import ModalEditUser from "@/components/modalEditUser"
import api from "@/services/api"
import { IUserProps, IUserResponse } from "@/types"
import { Box, List, ListItem, Text } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import nookies from "nookies"

const User = ({token, userId, user}: IUserProps) => {
  return (
    <>
      <Box>
        <Text>Seus Dados</Text>
        <List>
          <ListItem>{user.name}</ListItem>
          <ListItem>{user.email}</ListItem>
          <ListItem>{user.phone}</ListItem>
        </List>
      </Box>
      <ModalEditUser token={token} userId={userId}/>
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