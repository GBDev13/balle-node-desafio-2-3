import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { LoginCard } from '../../components/LoginCard';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from './styles';
import { BiIdCard } from 'react-icons/bi';

import UserIcon from '../../assets/usernamelogo.svg?component';
import PassIcon from '../../assets/passwordlogo.svg?component';
import toast from 'react-hot-toast';

export function EditAccount() {
  const { isLoading, isAuthenticated, updateAccount, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    if (!!user) {
      if(!name) setName(user.name ?? '');
      if(!email) setEmail(user.email ?? '');
    }
  }, [user])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(password !== passwordConfirm) {
      toast.error("The password confirmation does not match");
      return
    }

    await updateAccount({ name, email, password })
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
            <button type="submit" className="login">UPDATE</button>
            <button type="button" className="signup" onClick={() => navigate("/")}>BACK TO LOGIN</button>
          </>
        }
      />
    </Container>
  )
}