import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Props } from "../store/reducers";
import { LoginButton, LogoutButton } from "./LoginButton";

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
