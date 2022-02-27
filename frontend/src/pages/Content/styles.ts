import { lighten } from "polished";
import styled from "styled-components";

export const Container = styled.main`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.blue500} 0%,
    ${({ theme }) => theme.blue800} 100%
  );
  padding: 2.25rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid ${({ theme }) => theme.green600};
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  min-width: 25rem;
  color: #fff;

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: ${({ theme }) => theme.green600};
      border: none;
      color: #fff;
      padding: 0.3rem 0.8rem;
      border-radius: 0.2rem;
      transition: 0.4s;

      &:hover {
        background: ${({ theme }) => lighten(0.07, theme.green600)};
      }
    }
  }
`;
