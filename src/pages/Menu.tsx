import React, { Component } from "react";
import { connect } from "react-redux";
import AuthNav from "../containers/nav/AuthNav";
import MainNav from "../containers/nav/MainNav";
import { AuthState } from "../models/auth";

interface MenuProps {
  auth: AuthState;
}

class Menu extends Component<MenuProps> {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <AuthNav />

        <div className="main">
          <MainNav user={user} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Menu);
