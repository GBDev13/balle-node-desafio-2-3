import styled from "styled-components";

export const Container = styled.form`
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
  gap: 3rem;
  min-width: 25rem;

  > svg {
    max-width: 8rem;
  }

  > section {
    width: 100%;

    h2 {
      color: #fff;
      text-align: center;
      margin-bottom: 2rem;
    }

    > span {
      color: #fff;
      font-size: 0.8rem;
      text-align: right;
      display: block;
      opacity: 0.2;
      margin-top: 1rem;
      transition: 0.4s;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const Buttons = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    cursor: pointer;
    padding: 0.4rem 1rem;
    text-align: center;
    border-radius: 20rem;
    font-size: 0.7rem;
    border: none;
    outline: none;
    transition: 0.4s;
    font-weight: 800;

    &.login {
      color: ${({ theme }) => theme.blue600};
      background: ${({ theme }) => theme.white800};

      &:hover {
        background: ${({ theme }) => theme.green600};
      }
    }

    &.signup {
      background: transparent;
      color: ${({ theme }) => theme.white800};
      &:hover {
        background: ${({ theme }) => theme.white800};
        color: ${({ theme }) => theme.blue600};
      }
    }
  }
`;
