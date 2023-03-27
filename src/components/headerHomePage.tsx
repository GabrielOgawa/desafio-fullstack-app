import ModalLogin from "@/components/modalLogin";
import ModalRegister from "@/components/modalRegister";
import { Box, Flex, Text } from "@chakra-ui/react";


const HeaderHomePage = () => {
  return (
    <>
    <Flex justifyContent={"center"} padding={"10"} alignItems={"center"} bg={"cyan.500"} height={"8vh"}>
      <Text fontWeight={"bold"} color={"black"} fontSize={22}>My Contacts</Text>
    </Flex>
    </>
  )
}

export default HeaderHomePage;