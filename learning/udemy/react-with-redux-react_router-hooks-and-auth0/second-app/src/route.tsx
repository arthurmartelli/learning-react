import { Component } from "react";
import { Route, Router } from "react-router";

import Component2 from "./components/Component2";
import Component3 from "./components/Component3";

import Container1 from "./container/Container1";
import Header from "./container/Header";

import history from "./utils/history";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <>
            <Header />
            <Route path="/" Component={Container1} />
            <Route path="/2" Component={Component2} />
            <Route path="/3" Component={Component3} />
          </>
        </Router>
      </div>
    );
  }
}
