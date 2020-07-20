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

interface InviteFriendsProps extends RouteComponentProps {
  auth: AuthState;
}

class InviteFriends extends Component<InviteFriendsProps, Readonly<any>> {
  constructor(props: InviteFriendsProps) {
    super(props);

    this.state = {
      inviteSent: false,
      friendEmails: [""],
      loading: false,
      error: "",
    };
  }

  addField = () => {
    const { friendEmails } = this.state;
    friendEmails.push("");
    this.setState({
      friendEmails,
    });
  };

  inviteFriends = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ loading: true, error: "" });

    // return console.log(this.state.friendEmails);

    axios
      .post("/friends/invite", {
        emails: this.state.friendEmails,
      })
      .then((res) => {
        this.setState({ loading: false, friendEmails: [""], inviteSent: true });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error:
            err.response.status === 500
              ? "Something went wrong"
              : "Please check your connection",
        });
        // console.error(err);
        logError(err);
      });
  };

  inviteMore = () => {
    this.setState({ inviteSent: false, friendEmails: [{ name: "" }] });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { friendEmails } = this.state;
    friendEmails[index] = e.target.value;

    this.setState({
      friendEmails,
    });
  };

  render() {
    const { inviteSent, friendEmails, loading, error } = this.state;

    return (
      <PageTemplate showSearch={true} history={this.props.history}>
        {inviteSent ? (
          <div className="invite-friends">
            <h3 style={{ margin: "0.7em 0 em 0" }}>Invitation sent</h3>
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

              {/* {loading ? (
                  <div style={{ textAlign: "end" }}>
                    <Spinner full={false} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    style={{ marginLeft: "auto" }}
                  >
                    Invite
                  </button>
                )} */}
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
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const InviteFriendsPage = connect(mapStateToProps)(InviteFriends);
