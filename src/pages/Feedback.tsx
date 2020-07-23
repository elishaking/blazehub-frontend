import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import "./Feedback.scss";
import { TextAreaFormInput } from "../components/form/TextFormInput";
import { TextFormInput, CompositeButton } from "../components/molecules";
import { logError } from "../utils/logError";
import { sendFeedback } from "../store/actions/feedback";
import { validateFeedbackInput } from "../validation/feedback";
import { FeedbackData } from "../models/feedback";
import { Form } from "../components/organisms/form";
import { PageTemplate } from "../components/templates";
import { AuthState } from "../models/auth";

interface FeedbackProps extends RouteComponentProps {
  auth: AuthState;
}

class Feedback extends Component<FeedbackProps> {
  state = {
    loading: false,
    feedbackSent: false,
    errors: {} as FeedbackData,

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

    const { name, email, message } = this.state;
    const { user } = this.props.auth;
    const feedbackData = {
      name: name || `${user.firstName} ${user.lastName}`,
      email: email || user.email,
      message,
    };

    const { isValid, errors } = validateFeedbackInput(feedbackData);

    this.setState({ errors });

    if (isValid) {
      this.setState({ loading: true });

      sendFeedback(feedbackData)
        .then((data: any) => {
          this.setState({ loading: false, feedbackSent: data.success });

          if (data.success)
            setTimeout(() => {
              this.setState({ feedbackSent: false });
            }, 3000);
        })
        .catch((err) => {
          this.setState({ loading: false });
          logError(err.response);
        });
    }
  };

  render() {
    const { user } = this.props.auth;
    const { errors, loading, feedbackSent } = this.state;

    return (
      <PageTemplate showSearch={true} history={this.props.history}>
        <div className="form-container">
          <h1 className="mb-1">Help BlazeHub improve</h1>
          <Form onSubmit={this.onSubmit}>
            <TextFormInput
              type="text"
              name="name"
              placeholder="name"
              error={errors.name}
              onChange={this.onChange as any}
              value={`${user.firstName} ${user.lastName}`}
            />

            <TextFormInput
              type="email"
              name="email"
              placeholder="email"
              error={errors.email}
              onChange={this.onChange as any}
              value={user.email}
            />

            <TextAreaFormInput
              name="message"
              placeholder="How or where will you like BlazeHub to improve"
              error={errors.message}
              onChange={this.onChange}
              rows={5}
            />

            {feedbackSent ? (
              <p>Feedback Sent</p>
            ) : (
              <CompositeButton loading={loading}>Send Feedback</CompositeButton>
            )}
          </Form>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const FeedbackPage = connect(mapStateToProps)(Feedback);
