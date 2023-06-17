import { Component, Dispatch } from "react";
import Actions, { ActionType } from "../store/actions/actions";
import { connect } from "react-redux";
import State from "../store/reducers/state";
import { RootState } from "../store/reducers";

class Container1 extends Component<ContainerProps, {}> {
  render() {
    return (
      <>
        <button onClick={() => this.props.action1()}>
          Dispatch Action Creator 2
        </button>
        <button onClick={() => this.props.action2()}>
          Dispatch Action Creator 2
        </button>
        <button onClick={() => this.props.action3("Hi")}>
          Dispatch Action Creator 3
        </button>

        <h1>{this.props.stateProp1 ? "true" : "false"}</h1>
        <h1>{this.props.payload}</h1>

        <input
          type="text"
          onChange={(e) => this.props.action3(e.target.value)}
        />
      </>
    );
  }
}

function mapStateToProps(state: RootState): State {
  return {
    stateProp1: state.reducer1.stateProp1,
    payload: state.user_reducer.payload,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionType>) {
  console.log(dispatch);
  return {
    action1: () => dispatch(Actions.SUCCESS),
    action2: () => dispatch(Actions.FAILURE),
    action3: (input: string) => dispatch(Actions.USER_INPUT(input)),
  };
}

type ContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Container1);
