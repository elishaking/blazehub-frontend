import React, { Component } from "react";
import AuthNav from "../containers/nav/AuthNav";
import MainNav from "../containers/nav/MainNav";

export default class Menu extends Component {
  render() {
    return (
      <div className="container">
        <AuthNav />

        <div className="main">{/* <MainNav /> */}</div>
      </div>
    );
  }
}
