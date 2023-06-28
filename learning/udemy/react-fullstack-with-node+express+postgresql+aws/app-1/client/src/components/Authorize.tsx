import { useAuth0 } from "@auth0/auth0-react";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { ACTIONS } from "../store/actions/actions";
import { DB_PROFILE, PROFILE } from "../data";
import { Props } from "../store/reducers";
import { connect } from "react-redux";
import { send_profile_to_db } from "../data/db_users";
import { useNavigate } from "react-router-dom";

type AuthorizeProps = ReturnType<typeof mapStateToProps>;
type AuthorizeDispatchProps = ReturnType<typeof mapDispatchToProps>;

const Authorize = (props: AuthorizeProps & AuthorizeDispatchProps) => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user !== null && user !== undefined) {
      props.login_success();
      props.add_profile(user);
      const db_user = {
        username: user.nickname,
        email: user.email,
        email_verified: user.email_verified,
      } satisfies DB_PROFILE;

      send_profile_to_db(db_user, props.set_db_profile).then(() =>
        navigate("/profile")
      );
    } else {
      props.login_failure();
      props.remove_profile();
    }
  }, [user, isAuthenticated]);

  return <></>;
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (p: PROFILE) => dispatch(ACTIONS.add_profile(p)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (p: DB_PROFILE) => dispatch(ACTIONS.set_db_profile(p)),
  };
}

function mapStateToProps(state: Props) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
