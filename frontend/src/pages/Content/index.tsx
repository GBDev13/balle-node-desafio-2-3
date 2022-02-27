import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Container } from "./styles";

export function Content() {
  const { isLoading, isAuthenticated, user, signOut, deleteAccount } = useAuth();

  const navigate = useNavigate();

  if(!isLoading && !isAuthenticated) {
    navigate("/")
    return <></>
  }

  return (
    <Container>
      <h1>Private Content</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <footer>
        <button onClick={() => signOut()}>Sign Out</button>
        <button onClick={() => navigate("/editAccount")}>Edit Account</button>
        <button onClick={() => deleteAccount()}>Delete this account</button>
      </footer>
    </Container>
  )
}