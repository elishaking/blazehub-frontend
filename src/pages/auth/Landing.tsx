import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { signinUser, signupUser } from "../../actions/authActions";
import Spinner from "../../components/Spinner";
import { TextFormInput } from "../../components/molecules";
import { UserSigninData, UserSignupData } from "../../models/user";
import { AuthState, AuthErrors } from "../../models/auth";
import Logo from "../../components/Logo";
import "./Landing.scss";
import { Button, OutlineButton } from "../../components/atoms";
import { Form } from "../../components/organisms/form";

interface LandingProps extends RouteComponentProps {
  auth: AuthState;
  signinUser: (userData: UserSigninData) => (dispatch: any) => void;
  signupUser: (
    userData: UserSignupData,
    history: any
  ) => (dispatch: any) => Promise<void>;
}

type LandingErrors = AuthErrors & {
  signinEmail: string;
  signinPassword: string;
};

interface LandingState {
  method: string;
  navLogoColor: string | undefined;

  signinEmail: string;
  signinPassword: string;

  signupEmail: string;
  signupPassword: string;
  firstName: string;
  lastName: string;
  gender: string;

  loadingSignin: boolean;
  loadingSignup: boolean;

  errors: LandingErrors;
  error: string;
}

class Landing extends Component<LandingProps, Readonly<LandingState>> {
  constructor(props: LandingProps) {
    super(props);
    this.state = {
      method: "POST",
      navLogoColor: "#fff",

      signinEmail: "",
      signinPassword: "",

      signupEmail: "",
      signupPassword: "",
      firstName: "",
      lastName: "",
      gender: "",

      loadingSignin: false,
      loadingSignup: false,

      errors: {} as LandingErrors,
      error: "",
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);

    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  // after redux store is updated, this life cycle method will be called
  componentWillReceiveProps(nextProps: any) {
    this.redirectIfAuthenticated(nextProps.auth.isAuthenticated);

    if (nextProps.auth.errors) {
      if (nextProps.auth.errors.data) {
        this.setState({
          errors: nextProps.auth.errors.data,
          loadingSignin: false,
          loadingSignup: false,
        });
      } else {
        this.setState({
          loadingSignin: false,
          loadingSignup: false,
          error: "Something went wrong, check your network",
        });
      }
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
    const newMethod = window.innerWidth > 1550 ? "POST" : "GET";
    if (this.state.method !== newMethod) {
      this.setState({
        method: newMethod,
      });
    }

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

  onSubmitSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ loadingSignin: true, error: "" });

    if (this.state.method === "POST") {
      const userData = {
        email: this.state.signinEmail,
        password: this.state.signinPassword,
      };
      this.props.signinUser(userData);
    } else {
      this.props.history.push("/signin");
    }
  };

  onSubmitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ loadingSignup: true, error: "" });

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
    };
    this.props.signupUser(userData, this.props.history);
  };

  render() {
    const { error, errors, navLogoColor } = this.state;
    // console.log(errors);

    return (
      <div className="container landing-bg">
        <header>
          <nav>
            <h1>
              <Logo color={navLogoColor} style={{ fontSize: "1.3em" }} />
              <span>BlazeHub</span>
            </h1>

            <div className="nav-right">
              <form
                id="signin-form"
                method={this.state.method}
                onSubmit={this.onSubmitSignin}
              >
                <div className="signin-input">
                  <div className="to-hide">
                    <TextFormInput
                      type="email"
                      name="signinEmail"
                      placeholder="email"
                      onChange={this.onChange}
                      error={errors.signinEmail as string}
                    />

                    <TextFormInput
                      type="password"
                      name="signinPassword"
                      placeholder="password"
                      onChange={this.onChange}
                      error={errors.signinPassword}
                    />
                  </div>

                  <div>
                    {this.state.loadingSignin ? (
                      <Spinner full={false} padding={false} />
                    ) : (
                      // <input
                      //   type="submit"
                      //   value="Sign In"
                      //   className="btn-input"
                      // />
                      <OutlineButton type="submit">Sign In</OutlineButton>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </nav>
        </header>

        <div className="content">
          <div className="left">
            <div className="inner">
              <div className="info">
                <ul>
                  <li>
                    <img
                      src="./assets/img/connect.svg"
                      alt="Connection"
                      srcSet=""
                    />
                    <h2>Connect With Friends</h2>
                  </li>
                  <li>
                    <img
                      src="./assets/img/converse.svg"
                      alt="Conversation"
                      srcSet=""
                    />
                    <h2>Chat, Share Photos, Videos and more</h2>
                  </li>
                  <li>
                    <img
                      src="./assets/img/commune.svg"
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
              {error && <h3 className="error-h3">{error}</h3>}

              <div className="welcome">
                <Logo style={{ fontSize: "2em" }} />
                <h1>Join BlazeHub Today</h1>
              </div>

              <Form onSubmit={this.onSubmitSignup}>
                <div className="name">
                  <TextFormInput
                    type="text"
                    name="firstName"
                    // id="firstName"
                    placeholder="first name"
                    onChange={this.onChange}
                    error={errors.firstName}
                  />

                  <TextFormInput
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    onChange={this.onChange}
                    error={errors.lastName}
                  />
                </div>

                <TextFormInput
                  type="email"
                  name="signupEmail"
                  placeholder="email"
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFormInput
                  type="password"
                  name="signupPassword"
                  // id="password"
                  placeholder="password"
                  onChange={this.onChange}
                  error={errors.password}
                />

                <select
                  name="gender"
                  id="gender"
                  className="fill-parent"
                  onChange={this.onChange}
                >
                  <option hidden disabled selected value="other">
                    gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {this.state.loadingSignup ? (
                  <Spinner full={false} />
                ) : (
                  // <input
                  //   type="submit"
                  //   value="Sign Up"
                  //   className="btn-input btn-pri"
                  // />
                  <Button type="submit">Sign Up</Button>
                )}
              </Form>
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

export default connect<any>(mapStateToProps, { signinUser, signupUser })(
  Landing
);
