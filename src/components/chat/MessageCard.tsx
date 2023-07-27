import { Button, Card, Group, NativeSelect, Stack, TextInput, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import data from '../../data/members.json';
import { IChatEntry, Member } from '../../types';
import { useMessageStore } from '../../stores/messages';

export function MessageCard({ message }: MessageCardProps) {
  const [updateMessage, deleteMessage] = useMessageStore((state) => [
    state.updateMessage, state.deleteMessage,
  ]);

  const [member, setMember] = useState<string>(message.member.name.toLowerCase());
  const [time, setTime] = useState<Dayjs>(dayjs(message.timestamp));
  const [timeString, setTimeString] = useState<string>('');
  const [content, setContent] = useState(message.content);
  const [attachmentURL, setAttachmentURL] = useState(message.attachment?.url || '');
  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  useEffect(() => {
    const msg: IChatEntry = {
      ...message,
      member: data.members.find((m) => m.name.toLowerCase() === member) as Member,
      timestamp: time.toDate(),
      content,
      attachment: attachmentURL ? {
        url: attachmentURL,
        type: 'image',
      } : undefined,
    };

    updateMessage(msg);
  }, [member, content, time, attachmentURL]);

  const updateTime = (value: string) => {
    const [hours, minutes] = value.split(':');

    const newTime = time
      .set('hour', parseInt(hours, 10))
      .set('minute', parseInt(minutes, 10));

    setTime(newTime);
    setTimeString(newTime.format('HH:mm'));
  };

  const handleDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <Group>
      <Card style={{ flexGrow: 1 }} my={6} shadow="sm" padding={5} radius="sm" withBorder>
        <Card.Section inheritPadding>
          <Group my={5}>
            <NativeSelect
              style={{ flexGrow: 1 }}
              placeholder="Integrante"
              data={formMembers}
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />
            <TimeInput
              placeholder="Hora"
              value={timeString}
              onChange={(e) => updateTime(e.target.value)}
            />
          </Group>
        </Card.Section>
        <Card.Section inheritPadding>
          <Stack my={6}>
            <Textarea placeholder="Mensaje" value={content} onChange={(e) => setContent(e.target.value)} />
            <TextInput type="url" placeholder="URL adjunto" value={attachmentURL} onChange={(e) => setAttachmentURL(e.target.value)} />
          </Stack>
        </Card.Section>
      </Card>
      <Button variant="light" color="red" onClick={handleDelete}>Eliminar</Button>
    </Group>
  );
}

interface MessageCardProps {
  message: IChatEntry
}
