import Logo from '../../assets/logo.svg?component';

import { Container, Buttons } from "./styles";
import { FormEvent, ReactNode, useState } from 'react';

interface LoginCardProps {
  inputs: ReactNode;
  buttons: ReactNode;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

export function LoginCard({ handleSubmit, inputs, buttons }: LoginCardProps) {

  return (
    <Container onSubmit={handleSubmit}>
      <Logo />

      <section>
        {inputs}
      </section>

      <Buttons>
        {buttons}
      </Buttons>
    </Container>
  )
}