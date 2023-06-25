import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Props } from "../store/reducers";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: "http://localhost:3000" } })
      }
    >
      Log Out
    </button>
  );
};

const Header = (props: Props) => {
  const { is_authenticated } = props.auth_reducer;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/authorize">Authorize</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/posts/new">New Post</Link>
      {is_authenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default connect((state: Props) => state)(Header);
