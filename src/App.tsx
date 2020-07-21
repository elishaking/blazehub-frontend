import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import app from "firebase/app";

import "./App.scss";
import store from "./store/store";
import {
  setAuthToken,
  setCurrentUser,
  signoutUser,
} from "./store/actions/auth";
import {
  LandingPage,
  SigninPage,
  ConfirmPage,
  ResendConfirmPage,
  ForgotPasswordPage,
  PrivacyPage,
  ResetPasswordPage,
} from "./pages/auth";
import {
  HomePage,
  ProfilePage,
  ChatPage,
  FindFriendsPage,
  InviteFriendsPage,
  BookmarkPage,
  FeedbackPage,
  MenuPage,
} from "./pages";
import { PrivateRoute } from "./containers";
import { Spinner } from "./components/molecules";
import { Center, OutlineButton } from "./components/atoms";

class App extends Component<{}, Readonly<any>> {
  state = {
    loading: true,
    error: true,
  };

  componentDidMount() {
    this.updateAuthToken();
  }

  updateAuthToken = () => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decodedUserData: any = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decodedUserData));

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decodedUserData.exp < currentTime) {
        store.dispatch(signoutUser());

        // Redirect to signin
        window.location.href = "/signin";
      } else {
        axios
          .get("/firebase/config")
          .then((res) => {
            app.initializeApp(res.data);
            this.setState({ loading: false, error: false });
          })
          .catch((err) => {
            this.setState({ loading: false, error: true });
          });
      }
    } else {
      this.setState({ loading: false, error: false });
    }
  };

  render() {
    if (this.state.loading) return <Spinner />;

    if (this.state.error)
      return (
        <Center direction="column">
          <div>
            <h3>Something went wrong, please check your connection</h3>
          </div>

          <br />
          <br />

          <OutlineButton onClick={() => window.history.go()}>
            Retry
          </OutlineButton>
        </Center>
      );

    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signin" component={SigninPage} />
          <Switch>
            <Route exact path="/confirm/resend" component={ResendConfirmPage} />
            <Route exact path="/confirm/:token" component={ConfirmPage} />
          </Switch>
          <Route exact path="/password/forgot" component={ForgotPasswordPage} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPasswordPage}
          />
          <Route exact path="/privacy" component={PrivacyPage} />
          <Switch>
            <PrivateRoute exact path="/home" component={HomePage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/chat" component={ChatPage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/find" component={FindFriendsPage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/profile" component={ProfilePage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/bookmarks" component={BookmarkPage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/invite" component={InviteFriendsPage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/menu" component={MenuPage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/feedback" component={FeedbackPage} />
          </Switch>

          <Switch>
            <PrivateRoute exact path="/p/:username" component={ProfilePage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
