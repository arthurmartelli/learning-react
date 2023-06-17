type State = {
    stateProp1: boolean,
    payload: string
}

export const initialState = {
    stateProp1: false,
    payload: '',
} satisfies State

export default State
