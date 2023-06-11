import styled from '@emotion/styled';
import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';

const _InputContainer = styled(Box)`
  background: #FFFF00;
  height: 8%;
  display: flex;
  align-items: center;
`;

const InputContainer = createPolymorphicComponent<'div', BoxProps>(_InputContainer);

const InputBox = styled.input`
  background: #FFF;
  border: 1px solid #000000;
  border-radius: 16px;
  color: #000;
  padding-left: 20px;
  font-size: 14px;
  height: 40px;
  width: 100%;
  &::placeholder {
    color: #b2b2b2;
  }
`;

export function ChatInput() {
  return (
    <InputContainer px={12} py={30}>
      <InputBox placeholder="Escribe un mensaje..." />
    </InputContainer>
  );
}
