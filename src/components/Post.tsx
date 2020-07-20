import React, { Component } from "react";
import app from "firebase/app";
import "firebase/database";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faThumbsUp,
  faBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";
import Avatar from "./Avatar";
import { AuthUser } from "../models/auth";
import { PostData } from "../models/post";
import "./Post.scss";
import { logError } from "../utils/logError";

interface PostProps extends RouteComponentProps {
  post: PostData;
  user: AuthUser;
  otherUser?: any;
  canBookmark?: boolean;
}

class Post extends Component<PostProps, Readonly<any>> {
  beforeMountStyle = {
    opacity: 0,
    transform: "scale(0.7)",
    transition: "0.3s ease-in-out",
  };

  mountStyle = {
    opacity: 1,
    transform: "scale(1)",
    transition: "0.3s ease-in-out",
  };

  db: app.database.Database;
  postRef: app.database.Reference;
  bookmarkRef: app.database.Reference;
  profilePhotosRef: app.database.Reference;
  postImageRef: app.database.Reference;
  notificationsRef: app.database.Reference;

  constructor(props: PostProps) {
    super(props);

    const { post, user } = props;

    this.state = {
      post: {
        ...props.post,
      },
      showComments: false,
      liked: props.post.likes && props.post.likes[props.user.firstName],
      commentText: "",
      transitionStyle: this.beforeMountStyle,
      isBookmarked: false,
      postUserImage: "",
      loadingImage: props.post.imageUrl,
      postImage: "",
      postTextMaxHeight: "7em",
      postTextOverflows: false,
      viewImage: false,
    };

    this.db = app.database();
    this.postRef = this.db.ref("posts").child(post.key);
    this.postImageRef = this.db.ref("post-images").child(post.key);
    this.profilePhotosRef = this.db.ref("profile-photos");
    this.bookmarkRef = this.db.ref("bookmarks").child(user.id).child(post.key);
    this.notificationsRef = app.database().ref("notifications");
  }

  componentDidMount() {
    this.fetchUserPhoto();
    if (this.state.loadingImage) {
      this.fetchPostImage();
    }
    if (this.props.canBookmark) {
      this.fetchBookmarkStatus();
    }
    this.fetchLikes();
    this.fetchComments();
    this.setPostTextAction();
  }

  fetchUserPhoto() {
    this.profilePhotosRef
      .child(this.state.post.user.id)
      .child("avatar-small")
      .once("value", (postUserImageSnapShot: any) => {
        this.setState({ postUserImage: postUserImageSnapShot.val() });
      });
  }

  fetchPostImage() {
    this.postImageRef.once("value", (postImageSnapShot) => {
      this.setState({
        postImage: postImageSnapShot.val(),
        loadingImage: false,
      });
    });
  }

  fetchBookmarkStatus() {
    this.bookmarkRef.once("value", (bookmarkSnapShot: any) => {
      if (bookmarkSnapShot.exists()) {
        this.setState({ isBookmarked: bookmarkSnapShot.val() });
      }
    });
  }

  fetchLikes() {
    this.postRef.child("likes").on("value", (updatedLikesSnapShot) => {
      const { post } = this.state;
      post.likes = updatedLikesSnapShot.val();
      this.setState({
        post,
      });
      setTimeout(() => {
        this.setState({
          transitionStyle: this.mountStyle,
        });
      });
    });
  }

  fetchComments() {
    this.postRef
      .child("comments")
      .on("child_added", (newCommentSnapShot: any) => {
        const { post } = this.state;
        post.comments = {
          [newCommentSnapShot.key]: newCommentSnapShot.val(),
          ...post.comments,
        };
        this.setState({
          post,
        });
      });
  }

  setPostTextAction = () => {
    const pText = document.getElementById(this.state.post.key) as HTMLElement;

    if (pText.clientHeight < pText.scrollHeight) {
      this.setState({
        postTextMaxHeight: "7em",
        postTextOverflows: true,
      });
    }
  };

  deletePost = () => {
    this.postRef.remove().catch((err) => logError(err));
  };

  addLike(firstName: string) {
    this.postRef
      .child("likes")
      .child(firstName)
      .remove((err: any) => {
        if (err) {
          return logError(err);
        }

        this.setState({ liked: false });
      });
  }

  removeLike(user: AuthUser, post: PostData) {
    this.postRef
      .child("likes")
      .update({
        [user.firstName]: 1, // TODO: change to user_id
      })
      .then(() => {
        const newNotification = {
          type: "new_like",
          user,
          post: post.key,
          read: false,
          date: 1e15 - Date.now(),
        };
        this.notificationsRef
          .child(post.user?.id || "")
          .push(newNotification, (notifErr: any) => {
            if (notifErr) {
              return logError(notifErr);
            }
          });

        this.setState({ liked: true });
      })
      .catch((err) => logError(err));
  }

  likePost = () => {
    const { user } = this.props;
    const { liked, post } = this.state;

    if (liked) {
      this.addLike(user.firstName);
    } else {
      this.removeLike(user, post);
    }
  };

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
  };

  addComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 13 && this.state.commentText !== "") {
      let { commentText } = this.state;
      const { user } = this.props;
      const newComment = {
        text: commentText,
        date: Date.now(),
        user,
      };
      commentText = "";
      // @ts-ignore
      event.target.value = "";
      this.postRef
        .child("comments")
        .push(newComment)
        .then(() => {
          // console.log("comment added");
        })
        .catch((err) => {
          logError(err);
        });
    }
  };

  toggleBookmarkPost = () => {
    this.bookmarkRef.once("value", (bookmarkSnapShot: any) => {
      if (bookmarkSnapShot.exists()) {
        this.bookmarkRef.set(!bookmarkSnapShot.val(), (err: any) => {
          if (err) {
            // console.log(err);
          } else this.setState({ isBookmarked: !this.state.isBookmarked });
        });
      } else {
        this.bookmarkRef.set(true, (err: any) => {
          if (err) {
            // console.log(err);
          } else this.setState({ isBookmarked: !this.state.isBookmarked });
        });
      }
    });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  formatPostDate = (date: number) => {
    let now = Date.now();
    // date = 1e+15 - date;

    if (Math.abs(now - date) > 86400000)
      return new Date(date).toDateString().split(" ").slice(1, 3).join(" ");

    now /= 1000;
    date /= 1000;

    if (Math.abs(now - date) > 3600) {
      const hours = Math.floor(Math.abs(now - date) / 60 / 60);
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    }

    if (Math.abs(now - date) > 60) {
      const mins = Math.floor(Math.abs(now - date) / 60);
      return `${mins} min${mins > 1 ? "s" : ""} ago`;
    }

    // console.log(Math.abs(now - date));

    return "now";
  };

  viewPostUserProfile = () => {
    const { post } = this.state;

    if (post.user.username) this.props.history.push(`/p/${post.user.username}`);
  };

  togglePostImage = () => {
    this.setState({ viewImage: !this.state.viewImage });
  };

  toggleSeeMore = () => {
    this.setState({
      postTextMaxHeight: this.state.postTextMaxHeight ? "" : "7em",
    });
  };

  render() {
    const {
      post,
      postTextMaxHeight,
      postTextOverflows,
      liked,
      loadingImage,
      postUserImage,
      postImage,
      viewImage,
      showComments,
      transitionStyle,
      isBookmarked,
    } = this.state;
    return (
      <div>
        <div className="post" style={transitionStyle}>
          <header>
            <div className="user-post">
              {postUserImage ? (
                <Avatar avatar={postUserImage} marginRight="0.5em" />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} />
              )}
              <div>
                {/* {
                post.user.username ? (
                  <Link to={`/p/${post.user.username}`}><h4>{`${post.user.firstName}  ${post.user.lastName}`}</h4></Link>
                ) : (
                    <h4>{`${post.user.firstName}  ${post.user.lastName}`}</h4>
                  )
              } */}
                <h4
                  onClick={this.viewPostUserProfile}
                >{`${post.user.firstName}  ${post.user.lastName}`}</h4>
                <small>{this.formatPostDate(post.date)}</small>
              </div>
            </div>

            {!this.props.otherUser &&
              post.user.email === this.props.user.email && (
                <div
                  className="delete-post"
                  onClick={() => {
                    this.deletePost();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              )}
          </header>

          <p
            id={post.key}
            style={{
              maxHeight: postTextMaxHeight,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.text}
          </p>
          {postTextOverflows && (
            <button className="see-more" onClick={this.toggleSeeMore}>
              {postTextMaxHeight ? "See more" : "See less"}
            </button>
          )}
          {post.imageUrl &&
            (loadingImage ? (
              <div className="image-loading">
                <Spinner />
              </div>
            ) : (
              <div className="post-image">
                <img
                  onClick={this.togglePostImage}
                  src={postImage}
                  alt="Post"
                  srcSet=""
                />
              </div>
            ))}

          <hr />

          <div className="post-actions">
            <div>
              <button className="post-action" onClick={this.likePost}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ color: liked ? "#7c62a9" : "#888888" }}
                />
                <span style={{ color: liked ? "#7c62a9" : "#888888" }}>
                  {post.likes ? Object.keys(post.likes).length : 0}
                </span>
              </button>
              <button className="post-action" onClick={this.toggleComments}>
                <FontAwesomeIcon icon={faComments} />
                <span>
                  {post.comments ? Object.keys(post.comments).length : 0}
                </span>
              </button>
            </div>
            {/* <button className="post-action">
            <FontAwesomeIcon icon={faShare} />
            <span>{post.shares ? Object.keys(post.shares).length : 0}</span>
          </button> */}
            {this.props.canBookmark && (
              <button
                style={{
                  marginRight: 0,
                  color: isBookmarked ? "#7C62A9" : "#b1a3e1",
                }}
                className="post-action"
                onClick={this.toggleBookmarkPost}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            )}
          </div>

          {showComments && (
            <div className="comments">
              <hr />
              <div className="comment-input">
                <FontAwesomeIcon icon={faUserCircle} />
                <input
                  type="text"
                  name="commentText"
                  placeholder="Write a comment"
                  onKeyPress={this.addComment}
                  onChange={this.onChange}
                />
              </div>

              {post.comments &&
                Object.keys(post.comments).map((commentKey) => {
                  const comment = post.comments[commentKey];
                  return (
                    <div key={commentKey} className="comment">
                      <div className="comment-display">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <div>
                          <p>
                            <span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>{" "}
                            {comment.text}
                          </p>
                          <small>
                            {new Date(comment.date).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {viewImage && (
          <div className="modal-container">
            <div className="close" onClick={this.togglePostImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 49.243 49.243"
              >
                <g
                  id="Group_153"
                  data-name="Group 153"
                  transform="translate(-2307.379 -2002.379)"
                >
                  <line
                    id="Line_1"
                    data-name="Line 1"
                    x2="45"
                    y2="45"
                    transform="translate(2309.5 2004.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="7"
                  />
                  <line
                    id="Line_2"
                    data-name="Line 2"
                    x1="45"
                    y2="45"
                    transform="translate(2309.5 2004.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="7"
                  />
                </g>
              </svg>
            </div>

            <div className="inner-content">
              <div className="modal">
                <div>
                  <img src={postImage} alt={post.text.substr(0, 20)} />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <div className="actions">
                <button className="post-action" onClick={this.likePost}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: liked ? "#7c62a9" : "#888888" }}
                  />
                  <span style={{ color: liked ? "#7c62a9" : "#888888" }}>
                    {post.likes ? Object.keys(post.likes).length : 0}
                  </span>
                </button>
                {/* <button className="post-action" onClick={this.toggleComments}>
                  <FontAwesomeIcon icon={faComments} />
                  <span>{post.comments ? Object.keys(post.comments).length : 0}</span>
                </button> */}
                {this.props.canBookmark && (
                  <button
                    style={{
                      marginRight: 0,
                      color: isBookmarked ? "#7C62A9" : "#b1a3e1",
                    }}
                    className="post-action"
                    onClick={this.toggleBookmarkPost}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Post);
