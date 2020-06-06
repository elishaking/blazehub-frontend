import React, { Component } from "react";
import { RouteComponentProps, match } from "react-router-dom";

import {
  confirmPasswordResetUrl,
  resetPassword,
} from "../../actions/authActions";
import Spinner from "../../components/Spinner";
import { AuthState, ResetPasswordData } from "../../models/auth";
import "./Landing.scss";
import logError from "../../utils/logError";
import AuthContainer from "./AuthContainer";
import { TextFormInput } from "../../components/form/TextFormInput";
import { connect } from "react-redux";
import { validateResetPasswordInput } from "../../validation/resetPassword";

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
    };
  }

  componentDidMount() {
    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
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
          confirmMessage: err.response.data.data,
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

    this.setState({ loading: true });

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

        this.setState({ loading: false });
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
      message,
    } = this.state;

    return (
      <AuthContainer>
        <div className="form-container">
          {(() => {
            if (loadingConfirm)
              return (
                <>
                  <Spinner />
                  <small>Validating password reset url</small>
                </>
              );

            if (confirmSuccessful) {
              return successful ? (
                <>
                  <h3>Your password has been reset</h3>
                  <br />
                  <button
                    className="btn"
                    onClick={(e) => this.props.history.replace("/signin")}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h2 className="mb-1">Reset password</h2>
                  <form onSubmit={this.onSubmit}>
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

                    {loading ? (
                      <Spinner full={false} />
                    ) : (
                      <>
                        {successful !== undefined && (
                          <small className="error">
                            {confirmMessage ||
                              "Something went wrong, please try again"}
                          </small>
                        )}

                        <input
                          type="submit"
                          value="Reset"
                          className="btn-input btn-pri"
                        />
                      </>
                    )}
                  </form>
                </>
              );
            }

            return (
              <>
                <h3 className="error">
                  {message || "Password reset url is invalid"}
                </h3>
                <br />
                <button
                  className="btn"
                  onClick={(e) => this.props.history.push("/password/forgot")}
                >
                  Try again
                </button>
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

export default connect<any>(mapStateToProps)(ResetPassword);