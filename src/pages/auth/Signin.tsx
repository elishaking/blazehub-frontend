import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { signinUser } from "../../actions/authActions";
import { TextFormInput, CompositeButton } from "../../components/molecules";
import { UserSigninData } from "../../models/user";
import { AuthState } from "../../models/auth";
import { Form } from "../../components/organisms/form";
import { Button, FlatButton } from "../../components/atoms";

interface SigninProps extends RouteComponentProps {
  auth: AuthState;
  signinUser: (userData: UserSigninData) => (dispatch: any) => void;
}

class Signin extends Component<SigninProps, Readonly<any>> {
  constructor(props: SigninProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      error: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.redirectIfAuthenticated(this.props.auth.isAuthenticated);
  }

  // after redux store is updated, this life cycle method will be called
  componentWillReceiveProps(nextProps: any) {
    this.redirectIfAuthenticated(nextProps.auth.isAuthenticated);

    if (nextProps.auth.errors) {
      if (nextProps.auth.errors.data) {
        this.setState({
          errors: nextProps.auth.errors.data,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
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
      window.location.href = "/home";
    }
  };

  /**  @param {React.ChangeEvent<HTMLInputElement>} event */
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**  @param {React.FormEvent<HTMLFormElement>} event */
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ loading: true, error: "" });

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(userData);
  };

  render() {
    const { error, errors } = this.state;
    return (
      <div className="container">
        <header>
          <nav>
            <h1>
              <img src={`./assets/img/logo-pri.svg`} alt="Logo" srcSet="" />{" "}
              <span>BlazeHub</span>
            </h1>

            <Button onClick={() => this.props.history.push("/")}>
              Sign up
            </Button>
          </nav>
        </header>

        <div className="content block">
          <div className="form-container">
            <h1 className="mb-1">Sign In to BlazeHub</h1>
            <Form onSubmit={this.onSubmit} error={error}>
              <TextFormInput
                type="email"
                name="email"
                placeholder="email"
                error={errors.signinEmail}
                onChange={this.onChange}
              />

              <TextFormInput
                type="password"
                name="password"
                placeholder="password"
                error={errors.signinPassword}
                onChange={this.onChange}
              />

              <CompositeButton type="submit" loading={this.state.loading}>
                Sign In
              </CompositeButton>

              <FlatButton
                onClick={() => this.props.history.push("/password/forgot")}
              >
                Forgot Password?
              </FlatButton>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect<any>(mapStateToProps, { signinUser })(Signin);
