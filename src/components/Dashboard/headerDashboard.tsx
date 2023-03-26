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
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={22} color={"black"}>Dashboard</Text>
        <Menu>
          <MenuButton as={Button} cursor={"pointer"}>
            <Text>{userName}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem>Editar Perfil</MenuItem>
            <MenuItem onClick={() => logout()}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default HeaderDashboard;