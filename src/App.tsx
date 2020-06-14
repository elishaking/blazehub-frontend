// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import app from "firebase/app";
// import "./App.scss";
// import store from "./store";
// import { setAuthToken, setCurrentUser, signoutUser } from "./actions/auth";

// import PrivateRoute from "./containers/PrivateRoute";
// import Landing from "./pages/auth/Landing";
// import Signin from "./pages/auth/Signin";
// import Confirm from "./pages/auth/Confirm";
// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import FindFriends from "./pages/FindFriends";
// import Profile from "./pages/Profile";
// import Bookmarks from "./pages/Bookmarks";
// import InviteFriends from "./pages/InviteFriends";
// import Spinner from "./components/Spinner";
// import Menu from "./pages/Menu";
// import Privacy from "./pages/auth/Privacy";
// import Feedback from "./pages/Feedback";
// import ResendConfirm from "./pages/auth/ResendConfirm";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import { Center, OutlineButton } from "./components/atoms";

// // upon page reload/refresh, update user authentication token
// // updateAuthToken();

// class App extends Component<{}, Readonly<any>> {
//   state = {
//     loading: true,
//     error: true,
//   };

//   componentDidMount() {
//     this.updateAuthToken();
//   }

//   updateAuthToken = () => {
//     if (localStorage.jwtToken) {
//       setAuthToken(localStorage.jwtToken);

//       const decodedUserData: any = jwt_decode(localStorage.jwtToken);

//       store.dispatch(setCurrentUser(decodedUserData));

//       // Check for expired token
//       const currentTime = Date.now() / 1000;
//       if (decodedUserData.exp < currentTime) {
//         store.dispatch(signoutUser());

//         // Redirect to signin
//         window.location.href = "/signin";
//       } else {
//         axios
//           .get("/firebase/config")
//           .then((res) => {
//             app.initializeApp(res.data);
//             this.setState({ loading: false, error: false });
//           })
//           .catch((err) => {
//             this.setState({ loading: false, error: true });
//           });
//       }
//     } else {
//       this.setState({ loading: false, error: false });
//     }
//   };

//   render() {
//     if (this.state.loading) return <Spinner />;

//     if (this.state.error)
//       return (
//         <Center direction="column">
//           <div>
//             <h3>Something went wrong, please check your connection</h3>
//           </div>

//           <br />
//           <br />

//           <OutlineButton onClick={() => window.history.go()}>
//             Retry
//           </OutlineButton>
//         </Center>
//       );

//     return (
//       <Provider store={store}>
//         <Router>
//           <Route exact path="/" component={Landing} />
//           <Route exact path="/signin" component={Signin} />
//           <Switch>
//             <Route exact path="/confirm/resend" component={ResendConfirm} />
//             <Route exact path="/confirm/:token" component={Confirm} />
//           </Switch>
//           <Route exact path="/password/forgot" component={ForgotPassword} />
//           <Route
//             exact
//             path="/password/reset/:token"
//             component={ResetPassword}
//           />
//           <Route exact path="/privacy" component={Privacy} />
//           <Switch>
//             <PrivateRoute exact path="/home" component={Home} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/chat" component={Chat} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/find" component={FindFriends} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/profile" component={Profile} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/invite" component={InviteFriends} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/menu" component={Menu} />
//           </Switch>
//           <Switch>
//             <PrivateRoute exact path="/feedback" component={Feedback} />
//           </Switch>

//           <Switch>
//             <PrivateRoute exact path="/p/:username" component={Profile} />
//           </Switch>
//         </Router>
//       </Provider>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import app from "firebase/app";
import "./App.scss";
// import store from "./store";
// import {
//   setAuthToken,
//   setCurrentUser,
//   signoutUser,
// } from "./actions/authActions";

// import PrivateRoute from "./containers/PrivateRoute";
// import Landing from "./pages/auth/Landing";
// import Signin from "./pages/auth/Signin";
// import Confirm from "./pages/auth/Confirm";
// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import FindFriends from "./pages/FindFriends";
// import Profile from "./pages/Profile";
// import Bookmarks from "./pages/Bookmarks";
// import InviteFriends from "./pages/InviteFriends";
// import Spinner from "./components/Spinner";
// import Menu from "./pages/Menu";
// import Privacy from "./pages/auth/Privacy";
// import Feedback from "./pages/Feedback";
// import ResendConfirm from "./pages/auth/ResendConfirm";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import { Center, OutlineButton } from "./components/atoms";

// upon page reload/refresh, update user authentication token
// updateAuthToken();

class App extends Component<{}, Readonly<any>> {
  state = {
    loading: true,
    error: true,
  };

  componentDidMount() {
    // this.updateAuthToken();
  }

  // updateAuthToken = () => {
  //   if (localStorage.jwtToken) {
  //     setAuthToken(localStorage.jwtToken);

  //     const decodedUserData: any = jwt_decode(localStorage.jwtToken);

  //     store.dispatch(setCurrentUser(decodedUserData));

  //     // Check for expired token
  //     const currentTime = Date.now() / 1000;
  //     if (decodedUserData.exp < currentTime) {
  //       store.dispatch(signoutUser());

  //       // Redirect to signin
  //       window.location.href = "/signin";
  //     } else {
  //       axios
  //         .get("/api/users/firebase")
  //         .then((res) => {
  //           app.initializeApp(res.data);
  //           this.setState({ loading: false, error: false });
  //         })
  //         .catch((err) => {
  //           this.setState({ loading: false, error: true });
  //         });
  //     }
  //   } else {
  //     this.setState({ loading: false, error: false });
  //   }
  // };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ marginBottom: "1em" }}>
          BlazeHub will be back online in a few hours
        </h1>
        <p>Sorry for the incovenience</p>
      </div>
    );

    //   if (this.state.loading) return <Spinner />;

    //   if (this.state.error)
    //     return (
    //       <Center direction="column">
    //         <div>
    //           <h3>Something went wrong, please check your connection</h3>
    //         </div>

    //         <br />
    //         <br />

    //         <OutlineButton onClick={() => window.history.go()}>
    //           Retry
    //         </OutlineButton>
    //       </Center>
    //     );

    //   return (
    //     <Provider store={store}>
    //       <Router>
    //         <Route exact path="/" component={Landing} />
    //         <Route exact path="/signin" component={Signin} />
    //         <Switch>
    //           <Route exact path="/confirm/resend" component={ResendConfirm} />
    //           <Route exact path="/confirm/:token" component={Confirm} />
    //         </Switch>
    //         <Route exact path="/password/forgot" component={ForgotPassword} />
    //         <Route
    //           exact
    //           path="/password/reset/:token"
    //           component={ResetPassword}
    //         />
    //         <Route exact path="/privacy" component={Privacy} />
    //         <Switch>
    //           <PrivateRoute exact path="/home" component={Home} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/chat" component={Chat} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/find" component={FindFriends} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/profile" component={Profile} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/invite" component={InviteFriends} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/menu" component={Menu} />
    //         </Switch>
    //         <Switch>
    //           <PrivateRoute exact path="/feedback" component={Feedback} />
    //         </Switch>

    //         <Switch>
    //           <PrivateRoute exact path="/p/:username" component={Profile} />
    //         </Switch>
    //       </Router>
    //     </Provider>
    //   );
  }
}

export default App;
