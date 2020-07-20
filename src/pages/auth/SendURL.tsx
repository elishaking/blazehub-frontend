import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import "./Landing.scss";
import {
  resendConfirmationUrl,
  sendPasswordResetUrl,
} from "../../store/actions/auth";
import { AuthState } from "../../models/auth";
import { logError } from "../../utils";
import { AuthContainer } from "./AuthContainer";
import { TextFormInput, CompositeButton } from "../../components/molecules";
import { Form } from "../../components/organisms/form";
import { Button, SuccessMessage } from "../../components/atoms";
import { isEmailValid } from "../../validation/utils";

interface SendURLProps extends RouteComponentProps {
  auth: AuthState;
  type: "PASSWORD_RESET" | "CONFIRM";
}

interface SendURLState {
  loading: boolean;
  email: string;
  message: string;
  successful: boolean | undefined;
  errors: any;
  error: string;
}

export default class SendURL extends Component<
  SendURLProps,
  Readonly<SendURLState>
> {
  constructor(props: SendURLProps) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      successful: undefined,
      message: "",
      errors: {},
      error: "",
    };
  }

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

  /** @param {boolean} isAuthenticated */
  redirectIfAuthenticated = (isAuthenticated: boolean) => {
    // redirect authenticated user to home-page
    if (isAuthenticated) {
      // this.props.history.push('/home');
      window.location.href = "/signin";
    }
  };

  onChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as any);
  };

  navigate = (route: string) => {
    this.props.history.replace(route);
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email } = this.state;
    if (!email)
      return this.setState({ errors: { email: "Your email is required" } });

    if (!isEmailValid(email))
      return this.setState({ errors: { email: "Please enter a valid email" } });

    this.setState({ loading: true, error: "", message: "" });

    const apiMethod =
      this.props.type === "CONFIRM"
        ? resendConfirmationUrl
        : sendPasswordResetUrl;

    apiMethod(this.state.email)
      .then((res) => {
        this.setState({
          loading: false,
          successful: true,
          message: res.data.data,
        });
      })
      .catch((err) => {
        logError(err);

        if (err.response?.data?.data)
          return this.setState({
            loading: false,
            successful: false,
            errors: err.response.data.data,
          });

        this.setState({
          loading: false,
          successful: false,
          error:
            err.response?.data?.message ||
            "Something went wrong, check your connection",
        });
      });
  };

  render() {
    const { loading, errors, successful, message, error } = this.state;
    // console.log(errors);

    return (
      <AuthContainer>
        <div className="form-container">
          {successful ? (
            <>
              <SuccessMessage style={{ margin: "1.3em 0" }}>
                Sent <strong>reset link</strong>, Check your email to proceed.{" "}
                <br />
                <small>Please check your spam folder as well</small>
              </SuccessMessage>
              <br />
              <Button onClick={() => this.props.history.replace("/signin")}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <h2 className="mb-1" style={{ marginBottom: "0.1em" }}>
                {this.props.type === "CONFIRM"
                  ? "Please confirm your account"
                  : "Reset Password"}
              </h2>
              {this.props.type === "CONFIRM" && (
                <p style={{ marginBottom: "1.3em", fontSize: "0.8em" }}>
                  Enter your email to receive a confirmation link
                </p>
              )}
              <Form onSubmit={this.onSubmit} error={error} message={message}>
                <TextFormInput
                  type="email"
                  name="email"
                  placeholder="email"
                  error={errors.email}
                  onChange={this.onChange}
                />

                <CompositeButton loading={loading}>Send</CompositeButton>
              </Form>
            </>
          )}
        </div>
      </AuthContainer>
    );
  }
}
