import { useAuth0 } from "@auth0/auth0-react";
import { Dispatch } from "@reduxjs/toolkit";
import { ACTIONS } from "../../store/actions/actions";
import { POST } from "../../data";
import { Props } from "../../store/reducers";
import { connect } from "react-redux";
import { useEffect } from "react";
import PostCard from "./PostCard";
import { checkObjectProperties } from "../../utils/validateData";
import { get_user_posts } from "../../data/posts";

type ProfileProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Profile = (props: ProfileProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { db_profile, posts } = props;

  useEffect(() => {
    props.set_posts([]);
    if (!db_profile || !checkObjectProperties(db_profile)) return;
    get_user_posts(db_profile?.uid || "").then((r) => props.set_posts(r.data));
  }, []);

  if (isLoading) return <>Loading...</>;

  return isAuthenticated ? (
    <>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>

      {posts.map((post) => (
        <PostCard post={post} key={post.pid} />
      ))}
    </>
  ) : (
    <></>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    set_posts: (p: POST[]) => dispatch(ACTIONS.set_posts(p)),
  };
}

function mapStateToProps(state: Props) {
  return {
    db_profile: state.auth_reducer.db_profile,
    posts: state.post_reducer.posts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
