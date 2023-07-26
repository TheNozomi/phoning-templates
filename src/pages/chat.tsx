import { Box, Button, Container, Flex, Group, Select, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import { v4 as randomUUID } from 'uuid';
import { MessageCard } from '../components/chat/MessageCard';
import { ChatUI } from '../components/phoning/chat';
import { FormContainer } from '../components/shared';
import data from '../data/members.json';
import type { IChatEntry } from '../types';
import { Member } from '../types';
import { useMessageStore } from '../stores/messages';

export default function ChatPage() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [member, setMember] = useState<string | null>('minji');

  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  const [messagesFromStore, addMessage, updateMessage] = useMessageStore((state) => [
    state.messages, state.addMessage, state.updateMessage,
  ]);

  useEffect(() => {
    console.log('messagesFromStore', messagesFromStore);
  }, [messagesFromStore]);

  const [messages, setMessages] = useState<IChatEntry[]>([
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Holaaaa',
      timestamp: new Date('2023-06-09 10:00:10'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Estos mensajes deberían estar agrupados',
      timestamp: new Date('2023-06-09 10:00:20'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Porque fueron enviados en el mismo minuto',
      timestamp: new Date('2023-06-09 10:00:40'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Este debería estar en otro grupo',
      timestamp: new Date('2023-06-09 10:01:00'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Porque fue enviado un minuto después',
      timestamp: new Date('2023-06-09 10:01:10'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Probando un mensaje largo para ver cómo se comporta. Este mensaje debería ser lo suficientemente largo como para que se rompa en varias líneas y se vea bien en el chat.',
      timestamp: new Date('2023-06-09 10:02:20'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Este mensaje es de Minji',
      timestamp: new Date('2023-06-09 10:04:00'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Hanni') as Member,
      content: 'Y este mensaje es de Hanni',
      timestamp: new Date('2023-06-09 10:04:10'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Danielle') as Member,
      content: 'Por eso no se deberían agrupar aunque sean del mismo minuto',
      timestamp: new Date('2023-06-09 10:04:20'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Haerin') as Member,
      timestamp: new Date('2023-06-09 10:04:30'),
      attachment: {
        type: 'image',
        url: 'https://www.rd.com/wp-content/uploads/2023/04/GettyImages-1201778878-e1681753130752.jpg?fit=700,1024',
      },
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Haerin') as Member,
      content: '¿Qué tal se ve?',
      timestamp: new Date('2023-06-09 10:04:40'),
    },
    {
      id: randomUUID(),
      member: data.members.find((m) => m.name === 'Hyein') as Member,
      timestamp: new Date('2023-06-09 10:04:50'),
      attachment: {
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
    },
  ]);

  const handleMessageUpdate = (message: IChatEntry) => {
    console.log('handleMessageUpdate', message);
    const originalMessageIdx = messages.findIndex((m) => m.id === message.id);

    const newMessages = structuredClone(messages);
    newMessages[originalMessageIdx] = message;
    setMessages(newMessages);

    // todo: make this less ugly
    updateMessage(message);
  };

  const chatUIRef = useRef<HTMLDivElement>(null);

  const handleAddMessage = () => {
    const newMessage = {
      member: data.members.find((m) => m.name.toLowerCase() === member) as Member,
      content: '',
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
                <MessageCard key={message.id} message={message} onUpdate={handleMessageUpdate} />
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
