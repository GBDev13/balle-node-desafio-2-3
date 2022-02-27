import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../../components/Input";
import { LoginCard } from "../../components/LoginCard";
import { useAuth } from "../../contexts/AuthContext";
import { Container } from "./styles";
import PassIcon from '../../assets/passwordlogo.svg?component';

export function Forgot() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { isLoading, isAuthenticated, user, signOut, deleteAccount } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(password !== passwordConfirm) {
      toast.error("The password confirmation does not match");
      return
    }
  }

  const navigate = useNavigate();

  if(!isLoading && !isAuthenticated) {
    navigate("/")
    return <></>
  }

  return (
     <Container>
      <LoginCard
        handleSubmit={handleSubmit}
        inputs={
          <>
            <Input
              icon={<PassIcon />}
              placeholder="New Password"
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
            <button type="submit" className="login">RESET PASSWORD</button>
            <button type="button" className="signup" onClick={() => navigate("/")}>BACK TO LOGIN</button>
          </>
        }
      />
    </Container>
  )
}