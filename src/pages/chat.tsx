import { Box, Button, Container, Flex, Group, Modal, Select, Stack, TextInput, Title, Text } from '@mantine/core';
import { useClipboard, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import { toBlob } from 'html-to-image';
import saveAs from 'file-saver';
import QRCode from 'react-qr-code';
import { MessageCard } from '../components/chat/MessageCard';
import { ChatUI } from '../components/phoning/chat';
import { FormContainer } from '../components/shared';
import data from '../data/members.json';
import { Member } from '../types';
import { useMessageStore } from '../stores/messages';

export default function ChatPage() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [member, setMember] = useState<string | null>('minji');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard({ timeout: 500 });

  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  const [messagesFromStore, addMessage] = useMessageStore((state) => [
    state.messages, state.addMessage, state.updateMessage,
  ]);

  const chatUIRef = useRef<HTMLDivElement>(null);

  const handleAddMessage = () => {
    const newMessage = {
      member: data.members.find((m) => m.name.toLowerCase() === member) as Member,
      content: '[inserte algo interesante aquí]',
      timestamp: new Date(),
    };
    addMessage(newMessage);
  };

  const downloadImage = async () => {
    setIsDownloading(true);
    const node = document.getElementById('chatUI');
    const blob = await toBlob(node as HTMLElement);
    saveAs(blob as Blob, `${member}-chat-${(new Date()).toISOString().split('T')[0]}.png`);
    setIsDownloading(false);
  };

  const serializeStateToURL = () => {
    // TODO: actual logic to serialize state to URL
    open();
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
                  <Button onClick={serializeStateToURL}>Compartir</Button>
                  <Button
                    disabled={isDownloading}
                    onClick={downloadImage}
                  >
                    {isDownloading ? 'Procesando...' : 'Descargar imagen'}
                  </Button>
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

      <Modal opened={opened} onClose={close} title={<Title order={3}>Compartir</Title>} centered>
        <Flex direction="column" gap="sm">
          <Text>
            Usa este código QR para compartir o continuar en otro dispositivo:
          </Text>

          <Flex justify="center">

            <Box bg="white" p="sm" display="inline-flex">
              <QRCode value="test" />
            </Box>
          </Flex>

          <Text>También puedes copiar y pegar la URL:</Text>
          <Group>
            <TextInput value="test" readOnly style={{ flexGrow: 1 }} />
            <Button
              color={clipboard.copied ? 'teal' : 'blue'}
              onClick={() => clipboard.copy('test')}
            >
              {clipboard.copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </Group>
        </Flex>
      </Modal>
    </Container>
  );
}
