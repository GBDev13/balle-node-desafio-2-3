import { createGlobalStyle } from "styled-components";
import bgImage from "../assets/background.png";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.blue700};
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  #root, body {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body,
  input,
  textarea,
  button {
    font: 400 1rem 'Montserrat', sans-serif;
  }
  ul {
    list-style:none;
  }
  button {
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
