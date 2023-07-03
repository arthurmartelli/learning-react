import { DB_PROFILE, PROFILE } from "../../data"
import { ACTION, ACTION_TYPES } from "../actions/actions"

type authState = {
    is_authenticated: boolean,
    profile: PROFILE | null,
    db_profile: DB_PROFILE | null,
}

const initialState = {
    is_authenticated: false,
    profile: null,
    db_profile: null,
} satisfies authState

export const authReducer = (state = initialState, action: ACTION): authState => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                is_authenticated: true,
            }

        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                is_authenticated: false,
            }

        case ACTION_TYPES.ADD_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }

        case ACTION_TYPES.REMOVE_PROFILE:
            return {
                ...state,
                profile: null,
            }

        case ACTION_TYPES.ADD_DB_PROFILE:
            return {
                ...state,
                db_profile: action.payload,
            }

        case ACTION_TYPES.SET_DB_PROFILE:
            return {
                ...state,
                db_profile: action.payload,
            }

        case ACTION_TYPES.REMOVE_DB_PROFILE:
            return {
                ...state,
                db_profile: null,
            }

        default:
            return state
    }
}
