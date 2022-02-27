import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import styled, { css } from "styled-components";
import { Spinner } from "../components/Spinner";

type User = {
  id: string;
  name: string;
  email: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type SignUpCredentials = SignInCredentials & {
  name: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (data: SignUpCredentials) => Promise<void>;
  signOut: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setIsLoading: (load: boolean) => void;
  isLoading: boolean;
  deleteAccount: () => Promise<void>;
  sendForgotEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
}

type LoadingProps = {
  isLoading: boolean;
}

const LoadingContainer = styled.div<LoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 10;
  transition: .5s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;

  ${({ isLoading }) => isLoading && css`
    opacity: 1;
    pointer-events: auto;
  `}
`;

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("jadedragon.token");

    if (token) {
      api.get('/sessions/me')
      .then(response => {
        const { data } = response.data;

        setUser({ id: data.id, name: data.name, email: data.email })
      })
      .catch(() => {
        signOut()
      }).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [])

  
  function signOut() {
    localStorage.removeItem("jadedragon.token");
    setUser(undefined)
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setIsLoading(true);
      const response = await api.post("/sessions", {
        email,
        password
      });
      
      const { token, user } = response.data

      localStorage.setItem("jadedragon.token", token);

      setUser({ id: user.id, email: user.email, name: user.name })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      toast.success("Login success")
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      setIsLoading(true);
      await api.post("/users", {
        name,
        email,
        password
      });

      signIn({ email, password });
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAccount() {
    if(!user) return;
    try {
      setIsLoading(true);
      await api.delete(`/users/${user.id}`);

      signOut();
      toast.success("Account deleted successfully")
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  }

  async function sendForgotEmail(email: string) {
    try {
      setIsLoading(true);
      await api.post('/users/forgot', { email });

      toast.success("Recovery email was sent successfully")
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(token: string, password: string) {
    try {
      setIsLoading(true);
      await api.patch(`/users/reset/${token}`, { password });

      toast.success("Password changed successfully")
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
        isLoading,
        setIsLoading,
        signUp,
        deleteAccount,
        sendForgotEmail,
        resetPassword
      }}>
      <LoadingContainer isLoading={isLoading}>
        <Spinner />
      </LoadingContainer>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}