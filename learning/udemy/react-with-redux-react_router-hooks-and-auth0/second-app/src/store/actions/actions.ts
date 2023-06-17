// type of action objects
export type ActionType = {
    type: string
    payload?: string
}

// define a factory for creating all action objects
export function actionFactory(type: string, values?: Object): ActionType {
    return {
        type,
        ...values
    }
}

export enum PossibleActions {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    USER_INPUT = 'USER_INPUT'
}

// action creator
export const Actions = {
    SUCCESS: actionFactory(PossibleActions.SUCCESS),
    FAILURE: actionFactory(PossibleActions.FAILURE),
    USER_INPUT: (text: string) => actionFactory(PossibleActions.USER_INPUT, { payload: text }),
}

export default Actions;
