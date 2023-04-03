import api from "@/services/api";
import { IContactIdProps } from "@/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";

const ModalDeleteContact = ({contactId, token, setFakeContacts}: IContactIdProps) => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()

  const deleteContact = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${token}`
      api.delete(`/contacts/${contactId}`)
      toast({
        title: "sucess",
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
            Contato excluido com sucesso!
          </Box>
        ),
      })
    } catch (err){
      toast({
        title: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
        render: () => (
            <Box color={'gray.50'} p={3} bg={'red.600'} fontWeight={'bold'} borderRadius={'md'}>
              Erro ao excluir o contato, tente novamente
            </Box>
          ),
    })
      console.log(err)
    } finally {
      setFakeContacts((fakeContacts) => !fakeContacts)
      onClose()
    }

  }

  return (
    <>
    <Button cursor={"pointer"} onClick={onOpen} variant={"modalAdd"} >
      <DeleteIcon/>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Tem certeza que quer excluir o contato?</ModalHeader>
      <ModalBody>
        <Flex justifyContent={"center"} gap={5}>
          <Button onClick={() => deleteContact()} variant={"default"}>Excluir</Button>
          <Button onClick={onClose} variant={"cancel"}>Cancelar</Button>
        </Flex>
      </ModalBody>
    </ModalContent>
    </Modal>
    </>
  )
}

export default ModalDeleteContact;