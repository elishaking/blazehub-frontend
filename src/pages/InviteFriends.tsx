import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { AuthState } from "../models/auth";
import { logError } from "../utils/logError";
import { Button } from "../components/atoms";
import { Form } from "../components/organisms/form";
import { TextFormInput, CompositeButton } from "../components/molecules";
import { PageTemplate } from "../components/templates";

interface TProps extends RouteComponentProps {
  auth: AuthState;
}

interface Friend {
  receiver: string;
  email: string;
}

interface TState {
  inviteSent: boolean;
  friendEmails: Friend[];
  loading: boolean;
  error: string;
}

class InviteFriends extends Component<TProps, Readonly<TState>> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      inviteSent: false,
      friendEmails: [{ receiver: "", email: "" }],
      loading: false,
      error: "",
    };
  }

  render() {
    const { inviteSent, friendEmails, loading, error } = this.state;

    return (
      <PageTemplate showSearch={true} history={this.props.history}>
        {inviteSent ? (
          <div className="invite-friends">
            <h3 style={{ margin: "0.7em 0 0.7em 0" }}>Invitation sent</h3>
            <Button onClick={this.inviteMore}>Invite More</Button>
          </div>
        ) : (
          <div className="invite-friends">
            <h3>Invite your friends</h3>

            <Form
              className="add-friend"
              onSubmit={this.inviteFriends}
              error={error}
            >
              {friendEmails.map((_: any, index: number) => (
                <TextFormInput
                  type="email"
                  key={index}
                  name={`email${index}`}
                  placeholder="email"
                  onChange={(e: any) => this.onChange(e, index)}
                />
              ))}

              <Button type="button" className="btn" onClick={this.addField}>
                Add Email
              </Button>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <CompositeButton loading={loading}>
                  Invite {friendEmails.length > 1 && <span>All</span>}
                </CompositeButton>
              </div>
            </Form>
          </div>
        )}
      </PageTemplate>
    );
  }

  addField = () => {
    this.setState((state, props) => ({
      friendEmails: [...state.friendEmails, { receiver: "", email: "" }],
    }));
  };

  inviteFriends = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });
    // return console.log(this.state.friendEmails);
    axios
      .post("/friends/invite", {
        mails: this.state.friendEmails,
      })
      .then((res) => {
        this.setState({
          loading: false,
          friendEmails: [{ receiver: "", email: "" }],
          inviteSent: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          loading: false,
          error:
            err.response.status === 500
              ? "Something went wrong"
              : "Please check your connection",
        });
        logError(err);
      });
  };

  inviteMore = () => {
    this.setState({
      inviteSent: false,
      friendEmails: [{ receiver: "", email: "" }],
    });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { friendEmails } = this.state;
    friendEmails[index].email = e.target.value;

    this.setState({
      friendEmails,
    });
  };
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const InviteFriendsPage = connect(mapStateToProps)(InviteFriends);
