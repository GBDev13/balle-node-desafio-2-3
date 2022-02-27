import { Input } from '../../components/Input';
import { LoginCard } from '../../components/LoginCard';
import { Container } from './styles';
import UserIcon from '../../assets/usernamelogo.svg?component';
import PassIcon from '../../assets/passwordlogo.svg?component';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, isAuthenticated, signIn } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    signIn({ email, password })
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
            <Input
              icon={<UserIcon />}
              type="email"
              required
              value={email}
              onChangeFc={setEmail}
            />
            <Input
              icon={<PassIcon />}
              placeholder="Password"
              type="password"
              required
              value={password}
              onChangeFc={setPassword}
            />
          </>
        }
        buttons={
          <>
            <button type="submit" className="login">LOGIN</button>
            <button type="button" className="signup" onClick={() => navigate("/signup")}>SIGNUP</button>
          </>
        }
      />
    </Container>
  )
}