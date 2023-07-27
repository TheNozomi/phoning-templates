import { Box, Button, Container, Flex, Group, Select, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import { MessageCard } from '../components/chat/MessageCard';
import { ChatUI } from '../components/phoning/chat';
import { FormContainer } from '../components/shared';
import data from '../data/members.json';
import { Member } from '../types';
import { useMessageStore } from '../stores/messages';

export default function ChatPage() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [member, setMember] = useState<string | null>('minji');

  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  const [messagesFromStore, addMessage] = useMessageStore((state) => [
    state.messages, state.addMessage, state.updateMessage,
  ]);

  useEffect(() => {
    console.log('messagesFromStore', messagesFromStore);
  }, [messagesFromStore]);

  const chatUIRef = useRef<HTMLDivElement>(null);

  const handleAddMessage = () => {
    const newMessage = {
      member: data.members.find((m) => m.name.toLowerCase() === member) as Member,
      content: '[inserte algo interesante aquí]',
      timestamp: new Date(),
    };
    addMessage(newMessage);
  };

  return (
    <Container fluid px={isLandscape ? 15 : 2} py={12}>
      <Flex wrap="wrap" justify="space-between" gap="lg">
        <FormContainer>
          <Title order={2}>Chat</Title>
          <Stack my="lg" px={isLandscape ? 0 : 10}>
            <Select
              label="Chat"
              data={formMembers}
              value={member}
              onChange={setMember}
            />
            <Box>
              <Flex justify="space-between">
                <Title order={3} style={{ justifySelf: 'flex-start' }}>Mensajes</Title>
                <Group>
                  <Button>DL</Button>
                  <Button onClick={handleAddMessage}>Add</Button>
                </Group>
              </Flex>

              {messagesFromStore.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </Box>
          </Stack>
        </FormContainer>
        <Box>
          {isLandscape ? (
            <DeviceFrameset device="Galaxy Note 8" color="gold">
              <ChatUI
                innerRef={chatUIRef}
                member={data.members.find((m) => m.name.toLowerCase() === member) as Member}
                messages={messagesFromStore}
                forceAspectRatio
              />
            </DeviceFrameset>
          ) : (
            <ChatUI
              innerRef={chatUIRef}
              member={data.members.find((m) => m.name.toLowerCase() === member) as Member}
              messages={messagesFromStore}
              forceAspectRatio
            />
          )}
        </Box>
      </Flex>
    </Container>
  );
}
