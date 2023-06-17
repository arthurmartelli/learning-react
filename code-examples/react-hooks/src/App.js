import React, { useState, useReducer } from 'react';
import Routes from './routes';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';
import * as Reducer1 from './store/hooks_state/reducer1_hooks';
import * as UserReducer from './store/hooks_state/user_reducer_hooks';



const App = () => {
  const [valueGlobal, setValueGlobal] = useState(0)

  const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1, Reducer1.initialState)
  const [stateContext, dispatchContext] = useReducer(UserReducer.UserReducer, UserReducer.initialState)

  const incrementValueGlobal = () => {
    setValueGlobal(valueGlobal + 1 )
  }

  const decrementValueGlobal = () => {
    setValueGlobal(valueGlobal - 1 )
  }

  const handleDispatchContextTrue = () => {
    //    dispatch2(type: "SUCCESS")
    //    dispatch2(ACTIONS.SUCCESS)
    dispatchReducer1(ACTIONS.success())
  }

  const handleDispatchContextFalse = () => {
    //     dispatch2(type: "FAILURE")
    //    dispatch2(ACTIONS.FAILURE)
    dispatchReducer1(ACTIONS.failure())
  }

  const handleuseContextChange = (event) => {
    dispatchContext(ACTIONS.user_input_change(event.target.value))
  };

  const handleuseContextSubmit = (event) => {
    event.preventDefault();
    event.persist();
    dispatchContext(ACTIONS.user_input_submit(event.target.useContext.value))
  };

    return(
      <div>
      React
      <Context.Provider
          value={{
            userReducer1State: stateReducer1.stateprop2,
            dispatchContextTrue: () => handleDispatchContextTrue(),
            dispatchContextFalse: () => handleDispatchContextFalse(),

            valueGlobalState: valueGlobal,
            addGlobalValue: () => incrementValueGlobal(),
            decGlobalValue: () => decrementValueGlobal(),

            useContextChangeState: stateContext.user_textChange,
            useContextSubmitState: stateContext.user_textSubmit,
            useContextSubmit: (event) => handleuseContextSubmit(event),
            useContextChange: (event) => handleuseContextChange(event)
          }}>
        <Routes />
      </Context.Provider>
      </div>
    )
}


export default App;
