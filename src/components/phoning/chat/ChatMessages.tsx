import styled from '@emotion/styled';
import type { IChatEntry } from '../../../types';
import { ChatMessageGroup } from './ChatMessageGroup';

const MessagesContainer = styled.div`
  background: linear-gradient(180deg, #FFFF81 0%, #FFFFFF 34.06%);
  padding-left: 16px;
  padding-right: 16px;
  height: 84%;
  overflow-y: scroll;
  scrollbar-width: none;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const groupMessages = (messages: IChatEntry[], maxMessagesPerGroup: number): IChatEntry[][] => {
  const groups: IChatEntry[][] = [];
  let currentGroup: IChatEntry[] = [];

  messages.forEach((message, index) => {
    // If it's the first message or the member, timestamp, or maxMessagesPerGroup condition is met
    if (
      index === 0 ||
      message.member.name !== messages[index - 1].member.name ||
      message.timestamp.getMinutes() !== messages[index - 1].timestamp.getMinutes() ||
      currentGroup.length === maxMessagesPerGroup
    ) {
      // Create a new group
      currentGroup = [message];
      groups.push(currentGroup);
    } else {
      // Add the message to the current group
      currentGroup.push(message);
    }
  });

  return groups;
};

export function ChatMessages({ messages }: { messages: IChatEntry[] }) {
  // Group the messages
  const messageGroups = groupMessages(messages, 7);

  return (
    <MessagesContainer>
      {messageGroups.map((messageGroup, idx) => (
        <ChatMessageGroup key={idx} messages={messageGroup} />
      ))}
    </MessagesContainer>
  );
}
