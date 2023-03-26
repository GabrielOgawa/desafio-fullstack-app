import { IContactIdProps, IEditContact } from "@/types"
import { EditIcon } from "@chakra-ui/icons"
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import api from "@/services/api"
import contactEditSchema from "@/schemas/contactSchema"

const ModalEditContact = ({contactId, token, setContacts}: IContactIdProps) => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()

  const [inputEmail, setInputEmail] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputName, setInputName] = useState("")

  const emailError = inputEmail === ""

  const {
    register,
    handleSubmit,
    formState: {errors}  
  } = useForm<IEditContact>({
      resolver: yupResolver(contactEditSchema)
  })
  
  const onFormSubmit = async (formData:IEditContact) => {
      const {email, name, phone} = formData
      const contactData: IEditContact = {}
      if (email !== "") {
        contactData.email = email
      }
      if (name !== "") {
        contactData.name = name
      }
      if (phone !== "") {
        contactData.phone = phone
      }
      try {
        api.defaults.headers.authorization = `Bearer ${token}`
        api.patch(`/contacts/${contactId}`, contactData)
        toast({
          title: "sucess",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
              Contato alterado com sucesso!
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
                  Erro ao alterar o contato, tente novamente
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
      <EditIcon/>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>

      <ModalHeader>Alterar Contato</ModalHeader>

      <ModalBody>

      <FormControl id="email">
        <FormLabel>E-mail</FormLabel>
        <Input focusBorderColor="blue.300" type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
        {!emailError ? (
                  <FormHelperText>  
                  Digite um e-mail válido
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.email?.message}
                  </FormErrorMessage>
              )}
      </FormControl>

      <FormControl>
      <FormControl id="name">
        <FormLabel>Nome</FormLabel>
        <Input required focusBorderColor="blue.300" type="text" {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
        </FormControl>
      </FormControl>

      <FormControl id="phone">
        <FormLabel>Telefone</FormLabel>
        <Input required focusBorderColor="blue.300" type="text" {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
      </FormControl>

      </ModalBody>

      <ModalFooter>
      <Box>
        <Button onClick={handleSubmit(onFormSubmit)}>Alterar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </Box>
      </ModalFooter>

    </ModalContent>

    </Modal>
    </>
  )
}

export default ModalEditContact