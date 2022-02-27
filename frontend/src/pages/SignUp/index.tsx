import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { LoginCard } from '../../components/LoginCard';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from './styles';
import { BiIdCard } from 'react-icons/bi';

import UserIcon from '../../assets/usernamelogo.svg?component';
import PassIcon from '../../assets/passwordlogo.svg?component';
import toast from 'react-hot-toast';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { isLoading, isAuthenticated, signUp } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(password !== passwordConfirm) {
      toast.error("The password confirmation does not match");
      return
    }

    signUp({ name, email, password })
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
              icon={<BiIdCard />}
              required
              placeholder="Name"
              value={name}
              onChangeFc={setName}
            />
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
            <Input
              icon={<PassIcon />}
              placeholder="Password Confirmation"
              type="password"
              required
              value={passwordConfirm}
              onChangeFc={setPasswordConfirm}
            />
          </>
        }
        buttons={
          <>
            <button type="submit" className="login">SIGNUP</button>
            <button type="button" className="signup" onClick={() => navigate("/")}>BACK TO LOGIN</button>
          </>
        }
      />
    </Container>
  )
}