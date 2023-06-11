import styled from '@emotion/styled';
import { Image, Text } from '@mantine/core';
import type { IChatEntry } from '../../../types';

const ChatBubbleContainer = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  max-width: 90%;
  display: flex;
  align-items: flex-end;
  gap: 7px;
`;

const TextBubble = styled.div`
  background: linear-gradient(180deg, #FEFFFD 0%, #93E43D 80%);
  border: 1px solid #000;
  border-radius: 0px 16px 16px 16px;
  color: #000;
  padding: 6px 12px;
`;

const AttachmentContainer = styled.div`
  border: 1px solid #000;
  border-radius: 16px;
  color: #000;
`;

export function ChatBubble(props: IChatBubbleProps) {
  const { message } = props;

  return (
    <ChatBubbleContainer>
      {(message.attachment) ? (
        (message.attachment.type === 'image') ? (
          <AttachmentContainer>
            <Image alt={`Imagen de ${message.member.name}`} src={message.attachment.url} radius={16} />
          </AttachmentContainer>
        ) : (
          <TextBubble>
            <Text size={16} color="#ff0000">
              [Error]: No se puede mostrar este tipo de archivo.
            </Text>
          </TextBubble>
        )
      ) : (
        <TextBubble>
          <Text size={16} color="#000">
            {message.content}
          </Text>
        </TextBubble>
      )}

      {props.withTimestamp && (
        <Text size={14} color="#646464" mt={2}>
          {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      )}
    </ChatBubbleContainer>
  );
}

export interface IChatBubbleProps {
  message: IChatEntry;
  withTimestamp?: boolean;
}
