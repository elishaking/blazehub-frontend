import React, { Component } from "react";
import { connect } from "react-redux";
import app from "firebase/app";
import "firebase/database";

import "./Home.scss";
import { Posts } from "../containers/posts";
import { AuthState } from "../models/auth";
import { PostActions, PostImage, PostInput } from "../components/organisms";
import { resizeImage, logError } from "../utils";
import { PageTemplate } from "../components/templates";
import { getProfilePic } from "../store/actions/profile";

interface HomeState {
  postText: string;
  postImgDataUrl: string;
  notifications: any[];
  loadingNotifications: boolean;
  [key: string]: any;
}

interface HomeProps {
  auth: AuthState;
  profile: any;
  getProfilePic: (
    userId: string,
    key: string
  ) => (dispatch: any) => Promise<void>;
}

class Home extends Component<HomeProps, Readonly<HomeState>> {
  db = app.database();
  postsRef = this.db.ref("posts");
  postImagesRef = this.db.ref("post-images");

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      postText: "",
      postImgDataUrl: "",
      notifications: [],
      loadingNotifications: true,
    };
  }

  componentDidMount() {
    const { profile, auth } = this.props;
    if (!profile.avatar) this.props.getProfilePic(auth.user.id, "avatar");
  }

  render() {
    const { user } = this.props.auth;
    const { postText, postImgDataUrl } = this.state;

    return (
      <PageTemplate
        showSearch={true}
        notificationsRef={this.db.ref("notifications")}
        dataTest="homeComponent"
      >
        <div className="main-feed">
          <header>
            <div className="create-post">
              <h3>Create Post</h3>

              <PostInput postText={postText} onChange={this.onChange} />

              <PostImage
                postImgDataUrl={postImgDataUrl}
                removeImage={this.removeImage}
              />

              <PostActions
                createPost={this.createPost}
                showImage={this.showImage}
                selectImage={this.selectImage}
                selectEmoticon={this.selectEmoticon}
              />
            </div>
          </header>

          <div className="posts">
            <Posts user={user} />
          </div>
        </div>

        {/* <div className="extras">

          </div> */}
      </PageTemplate>
    );
  }

  /**
   * Opens file explorer for image attachment to new post
   */
  selectImage = () => {
    const postImgInput = document.getElementById("post-img") as HTMLElement;
    postImgInput.click();
  };

  /**
   * Opens Emoticon explorer
   */
  selectEmoticon = () => {
    // console.log("Opening emoticon explorer")
  };

  /**
   * Remove image attached to new post
   */
  removeImage = () => {
    this.setState({ postImgDataUrl: "" });
  };

  /**
   * Display image attached to new post
   */
  showImage = (e: any) => {
    const postImgInput = e.target;

    if (postImgInput.files && postImgInput.files[0]) {
      const imgReader = new FileReader();

      imgReader.onload = (err: any) => {
        if (postImgInput.files[0].size > 100000)
          resizeImage(
            err.target.result.toString(),
            postImgInput.files[0].type
          ).then((dataUrl: any) => {
            this.setState({ postImgDataUrl: dataUrl });
          });
        else this.setState({ postImgDataUrl: err.target.result });
      };

      imgReader.readAsDataURL(postImgInput.files[0]);
    }
  };

  /**
   * Create new post.
   * Updates database with new post
   */
  createPost = () => {
    const { postText, postImgDataUrl } = this.state;
    const newPost = {
      user: this.props.auth.user,
      text: postText,
      isBookmarked: false,
      date: 1e15 - Date.now(),
      imageUrl: postImgDataUrl !== "",
      // likes: { name: "likes" },
      // comments: { name: "comments" },
      // shares: { name: "shares" }
    };
    this.postsRef
      .push(newPost)
      .then((post: any) => {
        if (newPost.imageUrl)
          this.postImagesRef.child(post.key).set(postImgDataUrl);
      })
      .catch((err) => {
        logError(err);
      });

    this.setState({
      postText: "",
      postImgDataUrl: "",
    });
  };

  /**
   * Updates react-state with new data
   */
  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  profile: state.profile,
});

export const HomePage = connect<any>(mapStateToProps, { getProfilePic })(Home);
