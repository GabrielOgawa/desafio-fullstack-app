import api from "@/services/api";
import { IContacts, IDashProps } from "@/types";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalDeleteContact from "./Modals/modalDeleteContact";
import ModalEditContact from "./Modals/modalEditContact";
import ModalAddContact from "./Modals/modalAddContact";

const BodyDashboard = ({token}: IDashProps) => {
  const [contacts, setContacts] = useState<IContacts[] | []>([])
  useEffect(() => {
    const response = async () => {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const res = await api.get("/contacts")
      const contacts: IContacts[] = res.data
      setContacts(contacts)
    }
    response()
  }, [])
 
  return (
    <>
    <Box>
      <Flex>
        <Text fontSize={25} fontWeight={"bold"}>Contatos</Text>
        <ModalAddContact token={token} setContacts={setContacts}/>
      </Flex>
    </Box>
    <List>
      <ListItem>
        <Flex justifyContent={'space-between'}>
          <Text>Nome</Text>
          <Text>Email</Text>
          <Text>Telefone</Text>
          <Text></Text>
        </Flex>
      </ListItem>
      {
        contacts.map((contact) => {
          return (
            <ListItem key={contact.id}>
              <Flex justifyContent={'space-between'}>
                <Text>{contact.name}</Text>
                <Text>{contact.email}</Text>
                <Text>{contact.phone}</Text>
                <Box>
                  <ModalDeleteContact contactId={contact.id} token={token} setContacts={setContacts}/>
                  <ModalEditContact contactId={contact.id} token={token} setContacts={setContacts}/>
                </Box>
              </Flex>
            </ListItem>
          )
        })
      }
    </List>
    </>
  )
}

export default BodyDashboard;