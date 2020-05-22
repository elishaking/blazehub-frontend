import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  resendConfirmationUrl,
  sendPasswordResetUrl,
} from "../../actions/authActions";
import Spinner from "../../components/Spinner";
import { AuthState } from "../../models/auth";
import "./Landing.scss";
import logError from "../../utils/logError";
import AuthContainer from "./AuthContainer";
import { TextFormInput } from "../../components/form/TextFormInput";

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

    this.setState({ loading: true });

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

        this.setState({
          loading: false,
          successful: false,
          message: err.response.data.data,
        });
      });
  };

  render() {
    const { loading, errors, successful, message } = this.state;
    // console.log(errors);

    return (
      <AuthContainer>
        <div className="form-container">
          {successful ? (
            <>
              <h3>Sent, Check your email to proceed</h3>
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
              <h2 className="mb-1">
                {this.props.type === "CONFIRM"
                  ? "Resend confirmation URL"
                  : "Send password reset URL"}
              </h2>
              <form onSubmit={this.onSubmit}>
                <TextFormInput
                  type="email"
                  name="email"
                  placeholder="email"
                  error={errors.signinEmail}
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
                      value="Send"
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
