import React, { Component } from "react";
import { connect } from "react-redux";
import app from "firebase/app";
import "firebase/database";

import MainNav from "../containers/nav/MainNav";
import AuthNav from "../containers/nav/AuthNav";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import { RouteComponentProps } from "react-router-dom";
import { AuthState } from "../models/auth";

import { PostData } from "../models/post";

interface BookmarksProps extends RouteComponentProps {
  auth: AuthState;
}

class Bookmarks extends Component<BookmarksProps, Readonly<any>> {
  db = app.database();

  state = {
    bookmarkedPosts: new Array<PostData>(),
    loading: true,
  };

  componentDidMount() {
    this.setupFirebase();
  }

  setupFirebase = () => {
    this.db = app.database();

    this.db
      .ref("bookmarks")
      .child(this.props.auth.user.id)
      .orderByValue()
      .equalTo(true)
      .once("value", (bookmarksSnapShot) => {
        // console.log(bookmarksSnapShot.val());
        if (bookmarksSnapShot.exists()) {
          const bookmarks = bookmarksSnapShot.val();
          const bookmarkKeys = Object.keys(bookmarks);
          Promise.all(
            bookmarkKeys.map((_, i, bookmarkKeysArr) =>
              this.db
                .ref("posts")
                .child(bookmarkKeysArr[bookmarkKeys.length - i - 1])
                .once("value")
            )
          ).then((bookmarkedPostSnapshots) => {
            const { bookmarkedPosts } = this.state;
            bookmarkedPostSnapshots.forEach((bookmarkedPostSnapshot) => {
              bookmarkedPosts.push({
                key: bookmarkedPostSnapshot.key,
                ...bookmarkedPostSnapshot.val(),
              });
            });
            this.setState({ bookmarkedPosts, loading: false });
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
  };

  render() {
    const { user } = this.props.auth;
    const { bookmarkedPosts, loading } = this.state;

    return (
      <div className="container">
        <AuthNav
          showSearch={true}
          notificationsRef={this.db.ref("notifications")}
        />

        <div className="main">
          <MainNav user={user} />

          <div className="bookmarks">
            {/* <h3 style={{ textAlign: "center", fontWeight: "500", padding: "1em 0" }}>Bookmarks Coming Soon</h3> */}
            {loading ? (
              <Spinner />
            ) : bookmarkedPosts.length === 0 ? (
              <h3
                style={{
                  textAlign: "center",
                  padding: "1em 0",
                  fontWeight: 500,
                }}
              >
                You have not bookmarked any posts yet
              </h3>
            ) : (
              bookmarkedPosts.map((bookmarkedPost) => (
                <Post
                  key={bookmarkedPost.key}
                  post={bookmarkedPost}
                  user={user}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Bookmarks);
