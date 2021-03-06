import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AuthState } from "../../models/auth";
import "./Landing.scss";
import SendURL from "./SendURL";

interface ResendProps extends RouteComponentProps {
  auth: AuthState;
}

class ForgotPassword extends Component<ResendProps> {
  componentDidMount() {
    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  // after redux store is updated, this life cycle method will be called
  componentWillReceiveProps(nextProps: any) {
    this.redirectIfAuthenticated(nextProps.auth.isAuthenticated);

    if (nextProps.auth.errors) {
      this.setState({});
    }
  }

  redirectIfAuthenticated = (isAuthenticated: boolean) => {
    // redirect authenticated user to home-page
    if (isAuthenticated) {
      // this.props.history.push('/home');
      window.location.href = "/signin";
    }
  };

  render() {
    return <SendURL type="PASSWORD_RESET" {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const ForgotPasswordPage = connect<any>(mapStateToProps)(ForgotPassword);
