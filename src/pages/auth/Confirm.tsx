import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, match } from "react-router-dom";

import { verifyConfirmToken } from "../../actions/authActions";
import Spinner from "../../components/Spinner";
import { AuthState } from "../../models/auth";
import "./Landing.scss";
import logError from "../../utils/logError";
import AuthContainer from "./AuthContainer";

interface ConfirmProps extends RouteComponentProps {
  auth: AuthState;
  match: match<{ token: string }>;
}

interface ConfirmState {
  loading: boolean;
  message: string;
  successful: boolean;
}

class Confirm extends Component<ConfirmProps, Readonly<ConfirmState>> {
  constructor(props: ConfirmProps) {
    super(props);

    this.state = {
      loading: true,
      message: "",
      successful: false,
    };
  }

  componentDidMount() {
    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    verifyConfirmToken(this.props.match.params.token)
      .then((res) => {
        this.setState({
          loading: false,
          message: res.data.message,
          successful: res.data.success,
        });
      })
      .catch((err) => {
        logError(err);

        this.setState({
          loading: false,
          message: err.response.data.data,
          successful: false,
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

  render() {
    const { loading, message, successful } = this.state;
    // console.log(errors);

    return (
      <AuthContainer>
        {loading ? (
          <div
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Spinner />
            <small>Verifying confirmation url</small>
          </div>
        ) : (
          <div>
            <h2 style={{ color: successful ? undefined : "#ca0000" }}>
              {message}
            </h2>
            <br></br>
            {successful ? (
              <button className="btn" onClick={(e) => this.navigate("/signin")}>
                Sign In
              </button>
            ) : (
              <button
                className="btn"
                onClick={(e) => this.navigate("/confirm/resend")}
              >
                Resend URL
              </button>
            )}
          </div>
        )}
      </AuthContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect<any>(mapStateToProps)(Confirm);