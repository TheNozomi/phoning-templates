import { Button, Checkbox, Container, Flex, Select, Space, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import { useEffect, useState } from 'react';
import { CalendarEntry } from '../components/phoning/calendar';
import { FormContainer } from '../components/shared';
import { members } from '../data/members.json';

export default function CalendarPage() {
  const [member, setMember] = useState<string | null>('minji');
  const [title, setTitle] = useState<string>('🌧️🌧️ Título de prueba 🌧️🌧️');
  const [date, setDate] = useState<Date | null>(new Date());
  const [content, setContent] = useState<string>('Ejemplo de contenido');
  const [translatorNotes, setTranslatorNotes] = useState<string>('Notas de traducción');
  const [showSocials, setShowSocials] = useState<boolean>(true);
  const [forceAspectRatio, setForceAspectRatio] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [twitterMessage, setTwitterMessage] = useState<string>('');

  const formMembers = members.map((_member) => ({
    value: _member.name.toLowerCase(),
    label: _member.name,
  }));

  const downloadImage = async () => {
    setIsDownloading(true);
    const node = document.getElementById('calendarEntry');
    const blob = await toBlob(node as HTMLElement);
    saveAs(blob as Blob, `${member}-calendar-${(date ?? new Date()).toISOString().split('T')[0]}.png`);
    setIsDownloading(false);
  };

  const formatDate = (dateObj: Date | null) => {
    // eslint-disable-next-line no-param-reassign
    if (!dateObj) dateObj = new Date();

    const year = dateObj.getFullYear().toString().slice(-2);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
  };

  useEffect(() => {
    const memberData = members.find((m) => m.name.toLowerCase() === member);

    const twMessage = `📅 ${memberData?.emoji} ${formatDate(date)}\n#${memberData?.name} en el calendario de Phoning\n\n#NewJeans #뉴진스 #${memberData?.name} #${memberData?.hangul}`;
    setTwitterMessage(twMessage);
  }, [member, title, date]);

  return (
    <Container fluid px={6} py={12}>
      <Flex wrap="wrap" justify="space-between" gap="lg">
        <FormContainer>
          <Title order={2}>📅 Calendario</Title>
          <Stack my="lg">
            <Select
              label="Integrante"
              data={formMembers}
              value={member}
              onChange={setMember}
            />

            <TextInput
              label="Título"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />

            <DateInput
              value={date}
              onChange={setDate}
              label="Fecha"
            />

            <Textarea
              label="Contenido"
              value={content}
              minRows={4}
              onChange={(event) => setContent(event.currentTarget.value)}
            />

            <Textarea
              label="Notas de traducción"
              description="Borrar para no mostrar"
              value={translatorNotes}
              minRows={4}
              onChange={(event) => setTranslatorNotes(event.currentTarget.value)}
            />

            <Checkbox
              label="Mostrar redes sociales"
              checked={showSocials}
              onChange={(event) => setShowSocials(event.currentTarget.checked)}
            />

            <Checkbox
              label="Forzar aspect ratio (16:9)"
              checked={forceAspectRatio}
              onChange={(event) => setForceAspectRatio(event.currentTarget.checked)}
            />
          </Stack>

          <Button
            disabled={isDownloading}
            onClick={downloadImage}
          >
            {isDownloading ? 'Procesando...' : 'Descargar imagen'}
          </Button>

          <Space h="md" />

          <Textarea
            label="Mensaje para Twitter"
            value={twitterMessage}
            minRows={4}
            readOnly
            onChange={(event) => setTwitterMessage(event.currentTarget.value)}
          />
        </FormContainer>
        <CalendarEntry
          member={members.find((m) => m.name.toLowerCase() === member)}
          title={title}
          date={date}
          text={content}
          translatorNotes={translatorNotes}
          showSocials={showSocials}
          forceAspectRatio={forceAspectRatio}
        />
      </Flex>
    </Container>
  );
}
