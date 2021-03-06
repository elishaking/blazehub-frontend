import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import * as Sentry from "@sentry/browser";
// import app from 'firebase/app';
// import { firebaseKeys } from './keys.env';

// app.initializeApp({
//   apiKey: firebaseKeys.FIREBASE_API_KEY,
//   authDomain: firebaseKeys.FIREBASE_AUTH_DOMAIN,
//   databaseURL: firebaseKeys.FIREBASE_DATABASE_URL,
//   projectId: firebaseKeys.FIREBASE_PROJECT_ID,
//   storageBucket: firebaseKeys.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: firebaseKeys.FIREBASE_MESSEGING_SENDER_ID,
// });

if (process.env.NODE_ENV !== "development") {
  const BASE_URL = "https://blazehub-bk.herokuapp.com";
  axios.defaults.baseURL = BASE_URL;
}

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

Sentry.init({
  dsn: "https://8f9df8cc348a417199281b5eb31e341c@sentry.io/4173378",
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
