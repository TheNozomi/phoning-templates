import { ChevronLeft, OverflowMenuVertical } from '@carbon/icons-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, BoxProps, Text, createPolymorphicComponent } from '@mantine/core';
import Image from 'next/image';
import { Member } from '../../../types';
import { getAvatar } from '../../../utils/avatars';

const _ChatHeaderContainer = styled(Box)`
  background: linear-gradient(180deg, #FFFF2C 0%, #FFFF81 100%);
  display: flex;
  align-items: center;
  height: 8%;
`;

const ChatHeaderContainer = createPolymorphicComponent<'div', BoxProps>(_ChatHeaderContainer);

const HeaderButton = styled.button`
  background: #fff;
  border: 1px solid #000;
  border-radius: 100%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  ${(props: IHeaderButtonProps) =>
    props.size && css`
      width: ${props.size}px;
      height: ${props.size}px;
    `
  }
  ${(props: IHeaderButtonProps) =>
    props.position && css`
      ${(props.position === 'left') ? 'margin-right: auto;' : 'margin-left: auto;'}
    `
  }
  /* Align icons to the center */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ChatHeader({ member }: { member: Member }) {
  return (
    <ChatHeaderContainer px={12} py={30}>
      <HeaderButton title="Atrás" size={40}>
        <ChevronLeft color="#000" size={32} />
      </HeaderButton>
      <Image
        src={getAvatar(member.name)}
        alt={`Avatar de ${member.name}`}
        style={{
          marginLeft: 16,
          borderRadius: '50%',
          width: 40,
          height: 40,
        }}
      />
      <Text fw={700} size="lg" ml={8} color="#000">
        {member.name} {member.emoji}
      </Text>
      <HeaderButton title="Menú" size={40} position="right">
        <OverflowMenuVertical color="#000" size={32} />
      </HeaderButton>
    </ChatHeaderContainer>
  );
}

export interface IHeaderButtonProps {
  size?: number;
  position?: 'left' | 'right';
}
