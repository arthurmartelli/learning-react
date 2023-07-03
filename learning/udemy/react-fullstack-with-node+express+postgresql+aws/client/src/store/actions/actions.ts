import { COMMENT, DB_PROFILE, POST, PROFILE } from "../../data"

export enum ACTION_TYPES {
    "LOGIN_SUCCESS",
    "LOGIN_FAILURE",
    "ADD_PROFILE",
    "REMOVE_PROFILE",

    "ADD_DB_PROFILE",
    "SET_DB_PROFILE",
    "REMOVE_DB_PROFILE",

    "FETCH_DB_POST",
    "REMOVE_DB_POST",
    "SET_POSTS",

    "FETCH_POST_COMMENT",
    "REMOVE_POST_COMMENT",
    "UPDATE_COMMENTS"
}

const action_creator = (action: ACTION_TYPES, payload?: object) => {
    return {
        type: action,
        payload: payload || null
    }
}

export type ACTION = ReturnType<typeof action_creator>


export const ACTIONS = {
    login_success: () => action_creator(ACTION_TYPES.LOGIN_SUCCESS),
    login_failure: () => action_creator(ACTION_TYPES.LOGIN_FAILURE),
    add_profile: (profile: PROFILE) => action_creator(ACTION_TYPES.ADD_PROFILE, profile),
    remove_profile: () => action_creator(ACTION_TYPES.REMOVE_PROFILE),

    add_db_profile: (profile: DB_PROFILE) => action_creator(ACTION_TYPES.ADD_DB_PROFILE, profile),
    remove_db_profile: (profile: DB_PROFILE) => action_creator(ACTION_TYPES.REMOVE_DB_PROFILE, profile),
    set_db_profile: (profile: DB_PROFILE) => action_creator(ACTION_TYPES.SET_DB_PROFILE, profile),

    fetch_db_post: (posts: POST) => action_creator(ACTION_TYPES.FETCH_DB_POST, posts),
    remove_db_post: (posts: POST) => action_creator(ACTION_TYPES.REMOVE_DB_POST, posts),
    fetch_post_comments: (comments: COMMENT[]) => action_creator(ACTION_TYPES.FETCH_POST_COMMENT, comments),
    set_posts: (posts: POST[]) => action_creator(ACTION_TYPES.SET_POSTS, posts),

    update_comments: (comments: COMMENT[]) => action_creator(ACTION_TYPES.UPDATE_COMMENTS, comments),
    fetch_db_comment: (comments: COMMENT) => action_creator(ACTION_TYPES.FETCH_POST_COMMENT, comments),
    remove_db_comment: (comments: COMMENT) => action_creator(ACTION_TYPES.REMOVE_POST_COMMENT, comments),
}
