import { ActionType, PossibleActions } from '../actions/actions'
import State, { initialState } from './state'

const UserReducer = (state: State = initialState, action: ActionType): State => {
    switch (action.type) {
        case PossibleActions.USER_INPUT:
            return {
                ...state,
                payload: action.payload ? action.payload : '',
            }

        default:
            return state
    }
}

export default UserReducer