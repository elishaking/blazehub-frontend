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
import Spinner from "../components/Spinner";

interface FeedbackProps extends RouteComponentProps {
  auth: AuthState;
}

class Feedback extends Component<FeedbackProps> {
  state = {
    loading: false,
    errors: {} as FeedbackErrors,

    email: "",
    name: "",
    message: "",
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

    this.setState({ loading: true });

    // const { name, email, message } = this.state;
    // const feedbackData = {
    //   name,
    //   email,
    //   message,
    // };
    // this.props.sendFeedback(feedbackData);
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <div className="container">
        <AuthNav showSearch={true} history={this.props.history} />

        <div className="main">
          <MainNav user={user} />

          <div className="form-container">
            <h1 className="mb-1">Help BlazeHub improve</h1>
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
                rows={5}
              />

              {this.state.loading ? (
                <Spinner full={false} />
              ) : (
                <input
                  type="submit"
                  value="Send Feedback"
                  className="btn-input btn-pri"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Feedback);
