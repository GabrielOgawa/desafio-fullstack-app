import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { destroyCookie } from "nookies"
import { useRouter } from 'next/router';
import { IDashProps } from "@/types";

const HeaderDashboard = ({userName}: IDashProps) => {
  const router = useRouter()
  const logout = () => {
    destroyCookie(null, "desafio.token")
    router.push("/")
  }
  const edit = () => {
    router.push("/user")
  }
  return (
    <Box>
      <Flex justifyContent={"space-between"} padding={"10"} alignItems={"center"} bg={"cyan.500"} height={"8vh"}>
        <Text fontWeight={"bold"} fontSize={22} color={"black"}>My Contacts</Text>
        <Menu>
          <MenuButton as={Button} cursor={"pointer"} variant={"default"}>
            <Text>{userName}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => edit()} fontWeight={"bold"}>Editar Perfil</MenuItem>
            <MenuItem onClick={() => logout()} fontWeight={"bold"}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default HeaderDashboard;