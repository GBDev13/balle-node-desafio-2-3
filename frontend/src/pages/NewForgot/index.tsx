import { Input } from '../../components/Input';
import { LoginCard } from '../../components/LoginCard';
import { Container } from './styles';
import UserIcon from '../../assets/usernamelogo.svg?component';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function NewForgot() {
  const [email, setEmail] = useState('');

  const { isLoading, isAuthenticated, sendForgotEmail } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await sendForgotEmail(email);
    setEmail('');
  }

  const navigate = useNavigate();

  if(!isLoading && isAuthenticated) {
    navigate("/content");
    return <></>
  }

  return (
    <Container>
      <LoginCard
        handleSubmit={handleSubmit}
        inputs={
          <>
            <h2>Account email</h2>
            <Input
              icon={<UserIcon />}
              type="email"
              required
              value={email}
              onChangeFc={setEmail}
            />
          </>
        }
        buttons={
          <>
          <button type="submit" className="login">SEND EMAIL</button>
          <button type="button" className="signup" onClick={() => navigate("/")}>BACK TO LOGIN</button>
          </>
        }
      />
    </Container>
  )
}