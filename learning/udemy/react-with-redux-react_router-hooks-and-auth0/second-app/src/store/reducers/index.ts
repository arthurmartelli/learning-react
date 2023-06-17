import Reducer1 from './reducer1';
import UserReducer from './reducer_user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    reducer1: Reducer1,
    user_reducer: UserReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
