import { combineReducers } from "redux";
import { authReducer } from "./auth_reducer";
import { postReducer } from "./posts_reducer";

const rootReducer = combineReducers(
    {
        auth_reducer: authReducer,
        post_reducer: postReducer,
    }
)

export type Props = {
    auth_reducer: ReturnType<typeof authReducer>,
    post_reducer: ReturnType<typeof postReducer>,
};

export default rootReducer;