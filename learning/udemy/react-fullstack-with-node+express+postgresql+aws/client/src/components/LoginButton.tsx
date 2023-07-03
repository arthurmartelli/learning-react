import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}

function LogoutButton() {
  const { logout } = useAuth0();
  function handleClick() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }
  return <Button onClick={handleClick}>Log Out</Button>;
}

export { LoginButton, LogoutButton };
