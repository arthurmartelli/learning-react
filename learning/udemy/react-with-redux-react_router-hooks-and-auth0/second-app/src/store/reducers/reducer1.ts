import { ActionType, PossibleActions } from '../actions/actions'
import State, { initialState } from './state'

const Reducer1 = (state: State = initialState, action: ActionType): State => {
    switch (action.type) {
        case PossibleActions.SUCCESS:
            return {
                ...state,
                stateProp1: true
            }

        case PossibleActions.FAILURE:
            return {
                ...state,
                stateProp1: false
            }

        default:
            return state
    }
}

export default Reducer1