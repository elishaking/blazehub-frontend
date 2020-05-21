import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, match } from "react-router-dom";

import { verifyConfirmToken } from "../../actions/authActions";
import Spinner from "../../components/Spinner";
import { AuthState } from "../../models/auth";
import Logo from "../../components/Logo";
import "./Landing.scss";
import logError from "../../utils/logError";

interface ConfirmProps extends RouteComponentProps {
  auth: AuthState;
  match: match<{ token: string }>;
}

interface ConfirmState {
  navLogoColor: string | undefined;
  loading: boolean;
  message: string;
  successful: boolean;
}

class Confirm extends Component<ConfirmProps, Readonly<ConfirmState>> {
  constructor(props: ConfirmProps) {
    super(props);
    console.log(props.match.params.token);
    this.state = {
      navLogoColor: "#fff",
      loading: true,
      message: "",
      successful: false,
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);

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

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
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

  resize = () => {
    const newLogoColor = window.innerWidth > 1000 ? "#fff" : undefined;
    if (this.state.navLogoColor !== newLogoColor) {
      this.setState({
        navLogoColor: newLogoColor,
      });
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
    const { navLogoColor, loading, message, successful } = this.state;
    // console.log(errors);

    return (
      <div className="container landing-bg">
        <header>
          <nav>
            <h1>
              <Logo color={navLogoColor} style={{ fontSize: "1.3em" }} />
              <span>BlazeHub</span>
            </h1>
          </nav>
        </header>

        <div className="content">
          <div className="left">
            <div className="inner">
              <div className="info">
                <ul>
                  <li>
                    <img
                      src="../assets/img/connect.svg"
                      alt="Connection"
                      srcSet=""
                    />
                    <h2>Connect With Friends</h2>
                  </li>
                  <li>
                    <img
                      src="../assets/img/converse.svg"
                      alt="Conversation"
                      srcSet=""
                    />
                    <h2>Chat, Share Photos, Videos and more</h2>
                  </li>
                  <li>
                    <img
                      src="../assets/img/commune.svg"
                      alt="Community"
                      srcSet=""
                    />
                    <h2>Be a part of a growing community</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="inner">
              <div className="welcome">
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
                    <h1 style={{ color: successful ? undefined : "#ca0000" }}>
                      {message}
                    </h1>
                    <br></br>
                    {successful ? (
                      <button
                        className="btn"
                        onClick={(e) => this.navigate("/signin")}
                      >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect<any>(mapStateToProps)(Confirm);
