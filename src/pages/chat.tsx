import { Box, Container, Flex, Select, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import { ChatUI } from '../components/phoning/chat';
import { FormContainer } from '../components/shared';
import data from '../data/members.json';
import type { IChatEntry } from '../types';
import { Member } from '../types';

export default function ChatPage() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [member, setMember] = useState<string | null>('minji');

  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  const [messages] = useState<IChatEntry[]>([
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Holaaaa',
      timestamp: new Date('2023-06-09 10:00:10'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Estos mensajes deberían estar agrupados',
      timestamp: new Date('2023-06-09 10:00:20'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Porque fueron enviados en el mismo minuto',
      timestamp: new Date('2023-06-09 10:00:40'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Este debería estar en otro grupo',
      timestamp: new Date('2023-06-09 10:01:00'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Porque fue enviado un minuto después',
      timestamp: new Date('2023-06-09 10:01:10'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Probando un mensaje largo para ver cómo se comporta. Este mensaje debería ser lo suficientemente largo como para que se rompa en varias líneas y se vea bien en el chat.',
      timestamp: new Date('2023-06-09 10:02:20'),
    },
    {
      member: data.members.find((m) => m.name === 'Minji') as Member,
      content: 'Este mensaje es de Minji',
      timestamp: new Date('2023-06-09 10:04:00'),
    },
    {
      member: data.members.find((m) => m.name === 'Hanni') as Member,
      content: 'Y este mensaje es de Hanni',
      timestamp: new Date('2023-06-09 10:04:10'),
    },
    {
      member: data.members.find((m) => m.name === 'Danielle') as Member,
      content: 'Por eso no se deberían agrupar aunque sean del mismo minuto',
      timestamp: new Date('2023-06-09 10:04:20'),
    },
    {
      member: data.members.find((m) => m.name === 'Haerin') as Member,
      timestamp: new Date('2023-06-09 10:04:30'),
      attachment: {
        type: 'image',
        url: 'https://www.rd.com/wp-content/uploads/2023/04/GettyImages-1201778878-e1681753130752.jpg?fit=700,1024',
      },
    },
    {
      member: data.members.find((m) => m.name === 'Haerin') as Member,
      content: '¿Qué tal se ve?',
      timestamp: new Date('2023-06-09 10:04:40'),
    },
    {
      member: data.members.find((m) => m.name === 'Hyein') as Member,
      timestamp: new Date('2023-06-09 10:04:50'),
      attachment: {
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
    },
  ]);

  const chatUIRef = useRef<HTMLDivElement>(null);

  return (
    <Container fluid px={isLandscape ? 15 : 2} py={12}>
      <Flex wrap="wrap" justify="space-between" gap="lg">
        <FormContainer>
          <Title order={2}>Chat</Title>
          <Stack my="lg" px={isLandscape ? 0 : 10}>
            <Select
              label="Integrante"
              data={formMembers}
              value={member}
              onChange={setMember}
            />
            <Box>
              <Title order={3}>Form para agregar mensajes</Title>
            </Box>
          </Stack>
        </FormContainer>
        <Box>
          {isLandscape ? (
            <DeviceFrameset device="Galaxy Note 8" color="gold">
              <ChatUI
                ref={chatUIRef}
                member={data.members.find((m) => m.name.toLowerCase() === member) as Member}
                messages={messages}
                forceAspectRatio
              />
            </DeviceFrameset>
          ) : (
            <ChatUI
              ref={chatUIRef}
              member={data.members.find((m) => m.name.toLowerCase() === member) as Member}
              messages={messages}
              forceAspectRatio
            />
          )}
        </Box>
      </Flex>
    </Container>
  );
}
