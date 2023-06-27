import { useAuth0 } from "@auth0/auth0-react";
import { Dispatch } from "@reduxjs/toolkit";
import { ACTIONS } from "../../store/actions/actions";
import { DB_PROFILE, POST, PROFILE } from "../../data";
import { Props } from "../../store/reducers";
import { connect } from "react-redux";
import { useEffect } from "react";
import PostCard from "./PostCard";
import { checkObjectProperties } from "../../utils/validateData";
import { get_user_posts } from "../../data/posts";

type ProfileProps = ReturnType<typeof mapStateToProps>;
type ProfileDispatchProps = ReturnType<typeof mapDispatchToProps>;

const Profile = (props: ProfileProps & ProfileDispatchProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { db_profile, posts } = props;

  useEffect(() => {
    props.set_posts([]);
    if (!db_profile || !checkObjectProperties(db_profile)) return;
    get_user_posts(db_profile?.uid || "").then((r) => props.set_posts(r.data));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>

      {posts.map((post: POST) => (
        <PostCard post={post} key={post.pid} />
      ))}
    </>
  ) : (
    <></>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (p: PROFILE) => dispatch(ACTIONS.add_profile(p)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (p: DB_PROFILE) => dispatch(ACTIONS.set_db_profile(p)),
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
