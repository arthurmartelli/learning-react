import { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <>
        <Link to="/1">Container</Link>
        <Link to="/2">Component2</Link>
        <Link to="/3">Component3</Link>
      </>
    );
  }
}
