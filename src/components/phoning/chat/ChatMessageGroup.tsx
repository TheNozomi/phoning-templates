import styled from '@emotion/styled';
import { Text } from '@mantine/core';
import Image from 'next/image';
import { getAvatar } from '../../../utils/avatars';

import type { IChatEntry } from '../../../types';
import { ChatBubble } from './ChatBubble';

const MessageGroupContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TextContainer = styled.div`
  position: absolute;
  top: -20px;
`;

export function ChatMessageGroup({ messages }: { messages: IChatEntry[] }) {
  const { member } = messages[0];

  return (
    <MessageGroupContainer>
      <Image
        src={getAvatar(member.name)}
        alt={`Avatar de ${member.name}`}
        style={{
          borderRadius: '50%',
          width: 32,
          height: 32,
        }}
      />
      <BubbleContainer>
        <TextContainer>
          <Text color="#000" size={14}>{member.name}</Text>
        </TextContainer>
        {messages.map((message, index) => (
          <ChatBubble
            key={`${message.member.name}-${message.timestamp.toISOString()}`}
            message={message}
            withTimestamp={index === messages.length - 1}
          />
        ))}
      </BubbleContainer>
    </MessageGroupContainer>
  );
}
