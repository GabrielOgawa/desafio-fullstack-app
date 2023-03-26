import api from "@/services/api";
import { IContactIdProps } from "@/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";

const ModalDeleteContact = ({contactId, token, setContacts}: IContactIdProps) => {
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
      api.defaults.headers.authorization = `Bearer ${token}`
      const contacts = await api.get("/contacts")
      setContacts(contacts.data)
      onClose()
    }

  }

  return (
    <>
    <Button cursor={"pointer"} onClick={onOpen}>
      <DeleteIcon/>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Tem certeza que quer excluir o contato?</ModalHeader>
      <Box>
        <Button onClick={() => deleteContact()}>Excluir</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </Box>
    </ModalContent>
    </Modal>
    </>
  )
}

export default ModalDeleteContact;