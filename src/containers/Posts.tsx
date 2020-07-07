import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import app from "firebase/app";
import "firebase/database";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import { PostData } from "../models/post";

interface PostsProps extends RouteComponentProps {
  user: any;
  forProfile?: boolean;
  otherUserId?: string;
  otherUser?: any;
}

interface PostsState {
  posts: PostData[];
  loadingPosts: boolean;
}

class Posts extends Component<PostsProps, Readonly<PostsState>> {
  db: app.database.Database;
  postsRef: app.database.Reference;
  mountedOn = 0;
  user: any;
  otherUser: any;

  constructor(props: PostsProps) {
    super(props);

    this.state = {
      posts: [],
      loadingPosts: true,
    };

    this.db = app.database();
    this.postsRef = this.db.ref("posts");
  }

  componentDidMount() {
    this.mountedOn = Date.now();
    this.user = this.props.user;
    this.otherUser = this.props.otherUser;

    const { forProfile, otherUserId } = this.props;

    if (forProfile) {
      this.postsRef
        .orderByChild("user/id")
        .equalTo(this.otherUser ? otherUserId : this.user.id)
        .once("value")
        .then((postsSnapShot) => {
          const posts = postsSnapShot.val() || {};

          this.setState({
            posts: Object.keys(posts).map((_, i, postKeys) => {
              const postKey = postKeys[postKeys.length - i - 1];
              const newPost = {
                key: postKey,
                ...posts[postKey],
              };
              // set date
              newPost.date = 1e15 - newPost.date;

              if (this.state.loadingPosts)
                this.setState({ loadingPosts: false });

              return newPost;
            }),
          });

          if (this.state.loadingPosts) this.setState({ loadingPosts: false });
        });

      this.postsRef.on("child_removed", (postSnapShot) => {
        const { posts } = this.state;

        const deleteIndex = posts.findIndex(
          (post: PostData) => post.key === postSnapShot.key
        );
        posts.splice(deleteIndex, 1);
        this.setState({ posts });
      });
    } else {
      this.postsRef
        .orderByChild("date")
        .on("child_added", (newPostSnapShot) => {
          const newPost = {
            key: newPostSnapShot.key,
            ...newPostSnapShot.val(),
          };

          // set date
          newPost.date = 1e15 - newPost.date;

          if (this.state.loadingPosts) this.setState({ loadingPosts: false });

          const { posts } = this.state;
          newPost.date > this.mountedOn
            ? posts.unshift(newPost)
            : posts.push(newPost);
          this.setState({
            posts,
          });
        });

      this.postsRef.on("child_removed", (removedPostSnapShot) => {
        const { posts } = this.state;

        posts.splice(
          posts.findIndex((post) => post.key === removedPostSnapShot.key),
          1
        );

        this.setState({ posts });
      });
    }
  }

  render() {
    const { loadingPosts, posts } = this.state;
    // const { avatar } = this.props;

    if (loadingPosts)
      return (
        <div className="loading-container">
          <Spinner />
        </div>
      );

    if (posts.length > 0)
      return posts.map((post: any) => (
        <Post
          key={post.key}
          // profilesRef={app.database().ref("profiles")}
          post={post}
          user={this.user}
          canBookmark={true}
          otherUser={this.otherUser}
        />
      ));

    return (
      <div
        className="loading-container"
        style={{
          padding: "1em",
          textAlign: "center",
        }}
      >
        <p>You have not created any Posts yet</p>
        <button
          className="btn"
          style={{
            marginTop: "1em",
          }}
          onClick={() => this.props.history.push("/home")}
        >
          Create Post
        </button>
      </div>
    );
  }
}

export default withRouter(Posts);
