import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import "./Feedback.scss";
import AuthNav from "../containers/nav/AuthNav";
import MainNav from "../containers/nav/MainNav";
import { AuthState } from "../models/auth";
import {
  TextFormInput,
  TextAreaFormInput,
} from "../components/form/TextFormInput";
import { FeedbackErrors } from "../models/feedback";

interface FeedbackProps extends RouteComponentProps {
  auth: AuthState;
}

class Feedback extends Component<FeedbackProps> {
  state = {
    errors: {} as FeedbackErrors,
  };

  onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <div className="container">
        <AuthNav showSearch={true} history={this.props.history} />

        <div className="main">
          <MainNav user={user} />

          <form onSubmit={this.onSubmit}>
            <TextFormInput
              type="text"
              name="name"
              placeholder="name"
              error={errors.name}
              onChange={this.onChange}
            />

            <TextFormInput
              type="email"
              name="email"
              placeholder="email"
              error={errors.email}
              onChange={this.onChange}
            />

            <TextAreaFormInput
              name="message"
              placeholder="message"
              error={errors.message}
              onChange={this.onChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Feedback);
