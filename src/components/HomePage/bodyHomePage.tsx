import ModalLogin from "@/components/HomePage/Modals/modalLogin";
import ModalRegister from "@/components/HomePage/Modals/modalRegister";
import { Flex, Text } from "@chakra-ui/react";

const BodyHomePage = () => {
  return (
    <Flex maxWidth={"800px"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} margin={"0 auto"} padding={"5px"}>
      <Flex flexDirection={"column"} marginTop={"50px"} gap={"15px"}>
        <Text fontSize={"2xl"}>Você pode adicionar, editar e excluir contatos conforme necessário</Text>
        <Text fontSize={"2xl"}>Organize seus contatos de forma fácil e eficiente</Text>
      </Flex>
      <Flex marginTop={"25px"} gap={"20px"}>
        <ModalLogin/>
        <ModalRegister/>
      </Flex>
    </Flex>
  )
}
export default BodyHomePage