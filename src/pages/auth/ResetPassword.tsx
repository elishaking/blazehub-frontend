import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import { resetPassword } from "../../actions/authActions";
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
  type: "PASSWORD_RESET" | "CONFIRM";
}

interface ResetPasswordState {
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

    resetPassword(this.state.password)
      .then((res) => {
        this.setState({
          loading: false,
          message: res.data.data,
        });
      })
      .catch((err) => {
        logError(err);

        this.setState({ loading: false });
      });
  };

  render() {
    const { loading, errors, successful, message } = this.state;

    return (
      <AuthContainer>
        <div className="form-container">
          {successful ? (
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
                  type="confirmPassword"
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
                      <small
                        style={{
                          color: successful ? undefined : "#ca0000",
                        }}
                      >
                        {message || "Something went wrong, please try again"}
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
          )}
        </div>
      </AuthContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect<any>(mapStateToProps)(ResetPassword);
