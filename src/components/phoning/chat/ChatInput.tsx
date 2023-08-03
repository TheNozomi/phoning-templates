import styled from '@emotion/styled';
import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import { SocialIcons } from '../../shared/SocialIcons';

const _InputContainer = styled(Box)`
  background: #FFFF00;
  height: 8%;
  display: flex;
  align-items: center;
`;

const InputContainer = createPolymorphicComponent<'div', BoxProps>(_InputContainer);

const _InputBox = styled(Box)`
  background: #FFF;
  border: 1px solid #000000;
  border-radius: 16px;
  color: #000;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

const InputBox = createPolymorphicComponent<'div', BoxProps>(_InputBox);

export function ChatInput() {
  return (
    <InputContainer px={12} py={30}>
      <InputBox>
          <SocialIcons />
      </InputBox>
    </InputContainer>
  );
}
