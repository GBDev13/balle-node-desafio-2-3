import styled, { css } from "styled-components";

interface InputProps {
  isFocused: boolean;
  hasValue: boolean;
}

export const InputField = styled.div<InputProps>`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.blue200};
    transition: 0.4s;
  }

  & + & {
    margin-top: 1rem;
  }

  input {
    flex: 1;
    padding: 5px 5px;
    color: ${({ theme }) => theme.green600};
    outline: none;
    font-size: 0.8rem;
    font-weight: 500;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.blue200};
    background-color: transparent;
    transition: 0.4s;

    &::placeholder {
      opacity: 0.5;
    }
  }

  ${({ theme, isFocused, hasValue }) =>
    (isFocused || hasValue) &&
    css`
      svg {
        color: ${theme.green600};
      }
      input {
        border-color: ${theme.green600};
      }
    `}
`;
