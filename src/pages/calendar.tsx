import styled from '@emotion/styled';
import { Button, Checkbox, Container, Flex, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import { useState } from 'react';
import { CalendarEntry } from '../components/phoning/calendar';

const FormContainer = styled.form`
  flex: 1;
  @media (orientation: landscape) {
    max-width: 40vw;
  }
`;

export default function CalendarPage() {
  const [member, setMember] = useState<string>('Minji');
  const [title, setTitle] = useState<string>('🌧️🌧️ Título de prueba 🌧️🌧️');
  const [date, setDate] = useState<Date | null>(new Date());
  const [content, setContent] = useState<string>('Ejemplo de contenido');
  const [translatorNotes, setTranslatorNotes] = useState<string>('Notas de traducción');
  const [showSocials, setShowSocials] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadImage = async () => {
    setIsDownloading(true);
    const node = document.getElementById('calendarEntry');
    const blob = await toBlob(node as HTMLElement);
    saveAs(blob as Blob, `${member}-calendar-${(date ?? new Date()).toISOString().split('T')[0]}.png`);
    setIsDownloading(false);
  };

  return (
    <Container fluid px={6} py={12}>
      <Flex wrap="wrap" justify="space-between" gap="lg">
          <FormContainer>
            <Title order={2}>Calendario</Title>
            <Stack my="lg">
            <TextInput
              label="Integrante"
              value={member}
              onChange={(event) => setMember(event.currentTarget.value)}
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
            </Stack>

            <Button
              disabled={isDownloading}
              onClick={downloadImage}
            >
              {isDownloading ? 'Procesando...' : 'Descargar imagen'}
            </Button>
          </FormContainer>
        <CalendarEntry
          member={member}
          title={title}
          date={date}
          text={content}
          translatorNotes={translatorNotes}
          showSocials={showSocials}
        />
      </Flex>
    </Container>
  );
}
