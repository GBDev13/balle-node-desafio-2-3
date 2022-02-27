import { Container } from "./styles";

export function Spinner() {
  return (
    <Container>
      <div className="double-bounce1"/>
      <div className="double-bounce2"/>
    </Container>
  )
}