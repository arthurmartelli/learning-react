import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dispatch } from "redux";
import App from "./App";
import { AddPost, AllPost, EditPost, ShowPost } from "./blog/Posts";
import Authorize from "./components/Authorize";
import Header from "./components/Header";
import Profile from "./blog/Profile/Profile";
import { ACTIONS } from "./store/actions";
import { PROFILE } from "./data";
import { Props } from "./store/reducers";

type AppRouterProps = Props;
type AppRouterDispatchProps = ReturnType<typeof mapDispatchToProps>;

function AppRouter(props: AppRouterProps & AppRouterDispatchProps) {
  const { profile, is_authenticated } = props.auth_reducer;

  useEffect(() => {
    if (is_authenticated) {
      props.add_profile(profile || {});
      props.login_success();
    } else {
      props.login_failure();
      props.remove_profile();
    }
  }, [is_authenticated]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/posts" element={<AllPost />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/posts/:pid" element={<ShowPost />} />
        <Route path="/posts/edit/:pid" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile: PROFILE) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
  };
}

export default connect((state: Props) => state, mapDispatchToProps)(AppRouter);
