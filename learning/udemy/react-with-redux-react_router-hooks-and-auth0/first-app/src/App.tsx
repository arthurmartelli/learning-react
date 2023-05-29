import { Component } from "react";
import FirstComponent from "./components/FirstComponent";

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  state = {
    counter: 0,
  };

  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  styles = () => {
    return {
      color: "red",
    };
  };

  render() {
    window.document.title = `Clicked ${this.state.counter} times`;

    return (
      <>
        <div style={this.styles()}>Hello {this.state.counter}</div>
        <FirstComponent name="John" />
        <button onClick={() => this.setCounter()}>Click me</button>
      </>
    );
  }
}

export default App;
