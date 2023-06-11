import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IChatEntry, Member } from '../../../types';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

const ChatUIContainer = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  ${({ forceAspectRatio }: { forceAspectRatio?: boolean }) =>
    forceAspectRatio &&
    css`
      aspect-ratio: 9 / 16;
      /* Additional styles specific to the aspect ratio */
      /* ... */
    `
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function ChatUI(props: IChatUIProps) {
  const { member, messages } = props;

  return (
    <ChatUIContainer {...props}>
      <ChatHeader member={member} />
      <ChatMessages messages={messages} />
      <ChatInput />
    </ChatUIContainer>
  );
}

export interface IChatUIProps {
  member: Member;
  messages: IChatEntry[];
  forceAspectRatio?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}
