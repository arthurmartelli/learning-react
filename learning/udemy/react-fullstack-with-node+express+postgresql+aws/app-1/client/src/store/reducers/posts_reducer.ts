import { COMMENT, POST } from "../../data"
import { ACTION, ACTION_TYPES } from "../actions/actions"

type postState = {
    posts: Array<POST>,
    comments: Array<COMMENT>
}

const initialState = {
    posts: [],
    comments: [],
} satisfies postState

export const postReducer = (state = initialState, action: ACTION): postState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_DB_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload || {}],
            }

        case ACTION_TYPES.REMOVE_DB_POST:
            return {
                ...state,
                posts: initialState.posts,
            }

        case ACTION_TYPES.FETCH_POST_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload || {}],
            }

        case ACTION_TYPES.REMOVE_POST_COMMENT:
            return {
                ...state,
                comments: initialState.comments,
            }

        case ACTION_TYPES.UPDATE_COMMENTS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    comments: [...action.payload],
                };
            } else {
                return state;
            }

        case ACTION_TYPES.SET_POSTS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    posts: [...action.payload],
                };
            } else {
                return state;
            }

        default:
            return state
    }
}
