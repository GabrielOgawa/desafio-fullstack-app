import api from "@/services/api";
import { IContacts, IDash } from "@/types";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalDeleteContact from "./Modals/modalDeleteContact";
import ModalEditContact from "./Modals/modalEditContact";
import ModalAddContact from "./Modals/modalAddContact";

const BodyDashboard = ({token}: IDash) => {
  const [contacts, setContacts] = useState<IContacts[] | []>([])
  const [fakeContacts, setFakeContacts] = useState<boolean>(false)
  useEffect(() => {
    const response = async () => {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const res = await api.get("/contacts")
      const contacts: IContacts[] = res.data
      setContacts(contacts)
    }
    response()
  }, [fakeContacts])
  return (
    <Flex maxWidth={"800px"} flexDirection={"column"} margin={"0 auto"} gap={10} marginTop={"50px"} p={"10px"}>
    <Box>
      <Flex gap={2}>
        <Text fontSize={25} fontWeight={"bold"}>Contatos</Text>
        <ModalAddContact token={token} setFakeContacts={setFakeContacts}/>
      </Flex>
    </Box>
    <List bg={"gray.200"} border={"1px solid transparent"} borderRadius={"5px"}>
      {
        contacts.map((contact) => {
          return (
            <ListItem key={contact.id} padding={"10px"}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"bold"}>{contact.name}</Text>
                <Text>{contact.email}</Text>
                <Text>{contact.phone}</Text>
                <Box>
                  <ModalDeleteContact contactId={contact.id} token={token} setFakeContacts={setFakeContacts}/>
                  <ModalEditContact contactId={contact.id} token={token} setFakeContacts={setFakeContacts}/>
                </Box>
              </Flex>
            </ListItem>
          )
        })
      }
    </List>
    </Flex>
  )
}

export default BodyDashboard;