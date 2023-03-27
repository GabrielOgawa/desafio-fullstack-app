import contactSchema from "@/schemas/contactEditSchema";
import api from "@/services/api";
import { IContactIdProps, ICreateContact } from "@/types";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {useForm} from "react-hook-form"

const ModalAddContact = ({token, setContacts}: IContactIdProps) => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()

  const [inputEmail, setInputEmail] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputName, setInputName] = useState("")

  const emailError = inputEmail === ""
  const nameError = inputName === ""
  const phoneError = inputPhone === ""

  const {
    register,
    handleSubmit,
    formState: {errors}  
  } = useForm<ICreateContact>({
      resolver: yupResolver(contactSchema)
  })

  const onFormSubmit = async (formData:ICreateContact) => {
    try {
      api.defaults.headers.authorization = `Bearer ${token}`
      api.post(`/contacts`, formData)
      toast({
        title: "sucess",
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box color={'gray.50'} p={3} bg={'green.600'} fontWeight={'bold'} borderRadius={'md'}>
            Contato criado com sucesso!
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
                Erro ao criar o contato, tente novamente
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
    <Button cursor={"pointer"} variant={"modalAdd"} onClick={onOpen}>
      <AddIcon/>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>

      <ModalHeader>Criar Contato</ModalHeader>

      <ModalBody>

      <FormControl id="email" isRequired isInvalid={emailError}>
        <FormLabel>E-mail</FormLabel>
        <Input required focusBorderColor="blue.300" type="email" errorBorderColor='red.300' {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
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
      <FormControl id="name" isRequired isInvalid={nameError}>
        <FormLabel>Nome</FormLabel>
        <Input required focusBorderColor="blue.300" type="text" errorBorderColor='red.300' {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
        </FormControl>
        {!nameError ? (
                  <FormHelperText>  
                  Digite um nome
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.name?.message}
                  </FormErrorMessage>
              )}
      </FormControl>

      <FormControl id="phone" isRequired isInvalid={phoneError}>
        <FormLabel>Telefone</FormLabel>
        <Input required focusBorderColor="blue.300" type="text" errorBorderColor='red.300' {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
        {!phoneError ? (
                  <FormHelperText>  
                  Digite um telefone
                  </FormHelperText>
              ) : (
                  <FormErrorMessage>
                      {errors.phone?.message}
                  </FormErrorMessage>
              )}
      </FormControl>

      </ModalBody>

      <ModalFooter>
      <Flex gap={2}>
        <Button onClick={handleSubmit(onFormSubmit)} variant={"default"}>Criar</Button>
        <Button onClick={onClose} variant={"cancel"}>Cancelar</Button>
      </Flex>
      </ModalFooter>

    </ModalContent>

    </Modal>
    </>
  )
}
export default ModalAddContact;