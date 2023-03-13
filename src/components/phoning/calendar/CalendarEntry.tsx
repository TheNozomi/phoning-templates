import styled from '@emotion/styled';
import { Box, Divider, Flex, Space, Text, Title } from '@mantine/core';
import { Noto_Sans_KR, Roboto } from 'next/font/google';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import InstagramIcon from '../../../assets/icons/Instagram_icon.png';
import TwitterIcon from '../../../assets/icons/Twitter-logo.svg';

const CalendarEntryContainer = styled.div`
  background: linear-gradient(to bottom, #20f840, #ffffff 30%);
  flex-basis: 100%;
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  @media (orientation: landscape) {
    max-width: 30vw;
  }
`;

const CalendarContentContainer = styled.div`
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 12px;
  color: #000;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const CalendarEntryFooter = styled.div`
  color: #000;
  margin-top: 15px;
  margin-right: 15px;
`;

const titleFont = Roboto({
  subsets: ['latin'],
  weight: '700',
});

const textFont = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export function CalendarEntry(props: CalendarEntryProps) {
  const { member, title, date, text, translatorNotes, showSocials } = props;

  return (
    <CalendarEntryContainer id="calendarEntry">
      <Title order={2} mx={2} color="black" className={titleFont.className}>
        📅 Calendario
      </Title>
      <Space h={35} />
      <CalendarContentContainer>
        <Text className={textFont.className} size="sm" mb={5} fw={500} color="#808080">
          {member}
        </Text>
        <Title order={4} my={2}>{title}</Title>
        <Text size="xs" fw={500}>
          {(date ?? new Date()).toLocaleDateString('es-AR', {
            dateStyle: 'full',
          })}
        </Text>
        <Divider size="sm" color="gray" mt={6} />
        <Box py={5}>
          <Text color="#636363" className={textFont.className}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </Text>
        </Box>
        {translatorNotes && (
          <>
            <Divider size="sm" color="gray" />
            <Box py={2}>
              <Text color="blue" className={textFont.className}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{translatorNotes}</ReactMarkdown>
              </Text>
            </Box>
          </>
        )}
      </CalendarContentContainer>
      <CalendarEntryFooter>
        {showSocials && (
          <Flex align="center" justify="right" gap={8}>
            <Image width="24" src={InstagramIcon} alt="Instagram icon" />
            <Image width="24" src={TwitterIcon} alt="Twitter icon" />
            <Text align="right" size="lg" color="blue">
              @newjeansar
            </Text>
          </Flex>
        )}
      </CalendarEntryFooter>
    </CalendarEntryContainer>
  );
}

export interface CalendarEntryProps {
  member: string;
  title: string;
  date: Date | null;
  text: string;
  translatorNotes?: string;
  showSocials?: boolean;
}
