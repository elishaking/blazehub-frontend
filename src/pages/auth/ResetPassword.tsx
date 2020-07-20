import React, { Component } from "react";
import { RouteComponentProps, match } from "react-router-dom";

import { confirmPasswordResetUrl, resetPassword } from "../../actions/auth";
import Spinner from "../../components/Spinner";
import { AuthState, ResetPasswordData } from "../../models/auth";
import "./Landing.scss";
import logError from "../../utils/logError";
import { AuthContainer } from "./AuthContainer";
import { TextFormInput, CompositeButton } from "../../components/molecules";
import { connect } from "react-redux";
import { validateResetPasswordInput } from "../../validation/resetPassword";
import { SuccessMessage, Button, ErrorMessage } from "../../components/atoms";
import { Form } from "../../components/organisms/form";

interface ResetPasswordProps extends RouteComponentProps {
  auth: AuthState;
  match: match<{ token: string }>;
}

interface ResetPasswordState {
  loadingConfirm: boolean;
  confirmSuccessful: boolean;
  confirmMessage: string;
  loading: boolean;
  password: string;
  confirmPassword: string;
  message: string;
  successful: boolean | undefined;
  errors: ResetPasswordData;
  error: string;
}

class ResetPassword extends Component<
  ResetPasswordProps,
  Readonly<ResetPasswordState>
> {
  constructor(props: ResetPasswordProps) {
    super(props);

    this.state = {
      loadingConfirm: true,
      confirmSuccessful: false,
      confirmMessage: "",
      loading: false,
      password: "",
      confirmPassword: "",
      successful: undefined,
      message: "",
      errors: {} as ResetPasswordData,
      error: "",
    };
  }

  componentDidMount() {
    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated)
      return this.props.history.push("/home");

    confirmPasswordResetUrl(this.props.match.params.token)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.message);

        this.setState({
          loadingConfirm: false,
          confirmSuccessful: res.data.success,
          confirmMessage: res.data.message,
        });
      })
      .catch((err) => {
        logError(err);

        this.setState({
          loadingConfirm: false,
          confirmSuccessful: false,
          confirmMessage:
            err.response?.data?.data ||
            "Something went wrong, Please check your connection",
        });
      });
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

    const { password, confirmPassword } = this.state;
    const { isValid, errors } = validateResetPasswordInput({
      password,
      confirmPassword,
    });

    if (!isValid) return this.setState({ errors });

    this.setState({ loading: true, error: "" });

    resetPassword(this.props.match.params.token, this.state.password)
      .then((res) => {
        this.setState({
          loading: false,
          successful: true,
          message: res.data.data,
        });
      })
      .catch((err) => {
        logError(err);

        this.setState({
          loading: false,
          error:
            err.response?.data?.data ||
            "Something went wrong, Please check your connection",
        });
      });
  };

  render() {
    const {
      loadingConfirm,
      confirmSuccessful,
      confirmMessage,
      loading,
      errors,
      successful,
      // message,
      error,
    } = this.state;

    return (
      <AuthContainer>
        <div className="form-container">
          {(() => {
            if (loadingConfirm)
              return (
                <>
                  <Spinner />
                </>
              );

            if (confirmSuccessful) {
              return successful ? (
                <>
                  <SuccessMessage style={{ margin: "1.3em 0" }}>
                    Your password has been <strong>reset</strong>
                  </SuccessMessage>
                  <br />
                  <Button
                    onClick={(e) => this.props.history.replace("/signin")}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="mb-1">Reset password</h2>
                  <Form onSubmit={this.onSubmit} error={error}>
                    <TextFormInput
                      type="password"
                      name="password"
                      placeholder="password"
                      error={errors.password}
                      onChange={this.onChange}
                    />
                    <TextFormInput
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm password"
                      error={errors.confirmPassword}
                      onChange={this.onChange}
                    />

                    <CompositeButton loading={loading}>Reset</CompositeButton>
                  </Form>
                </>
              );
            }

            return (
              <>
                <ErrorMessage style={{ margin: "1.3em 0" }}>
                  {confirmMessage || "Password reset link is invalid"}
                </ErrorMessage>
                <Button
                  onClick={() => this.props.history.push("/password/forgot")}
                >
                  Try again
                </Button>
              </>
            );
          })()}
        </div>
      </AuthContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const ResetPasswordPage = connect<any>(mapStateToProps)(ResetPassword);
