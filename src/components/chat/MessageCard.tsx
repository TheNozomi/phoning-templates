import { Button, Card, Group, NativeSelect, Stack, TextInput, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import data from '../../data/members.json';
import { IChatEntry, Member } from '../../types';

export function MessageCard({ message, onUpdate }: MessageCardProps) {
  const [member, setMember] = useState<string>(message.member.name.toLowerCase());
  const [time, setTime] = useState<Date>(message.timestamp);
  const [timeString] = useState<string>('');
  const [content, setContent] = useState(message.content);
  const formMembers = data.members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  useEffect(() => {
    const msg: IChatEntry = {
      ...message,
      member: data.members.find((m) => m.name.toLowerCase() === member) as Member,
      content,
    };

    onUpdate(msg);
  }, [member, content]);

  const updateTime = (value: string) => {
    console.log(value);
    const [hours, minutes] = value.split(':');

    const newTime = time;

    newTime.setHours(parseInt(hours, 10));
    newTime.setMinutes(parseInt(minutes, 10));

    console.log(newTime);
    setTime(newTime);
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
              withSeconds
            />
          </Group>
        </Card.Section>
        <Card.Section inheritPadding>
          <Stack my={6}>
            <Textarea placeholder="Mensaje" value={content} onChange={(e) => setContent(e.target.value)} />
            <TextInput placeholder="URL adjunto" />
          </Stack>
        </Card.Section>
      </Card>
      <Button>Delete</Button>
    </Group>
  );
}

interface MessageCardProps {
  message: IChatEntry,
  onUpdate: (message: IChatEntry) => void;
}
