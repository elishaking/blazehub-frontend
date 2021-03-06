import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import app from "firebase/app";
import "firebase/database";

import "./Chat.scss";
import { Spinner } from "../components/molecules";
import { Avatar } from "../components/atoms";
import { getFriends } from "../store/actions/friend";
import { listenForNewChats } from "../store/actions/chat";
import { getProfilePic } from "../store/actions/profile";

// @ts-ignore
import notificationSound from "./notification.ogg";
import { AuthState } from "../models/auth";
import { PageTemplate } from "../components/templates";

interface ChatProps extends RouteComponentProps {
  profile: any;
  auth: AuthState;
  getFriends: () => (dispatch: any) => Promise<void>;
  getProfilePic: (
    userId: string,
    key: string
  ) => (dispatch: any) => Promise<void>;
  listenForNewChats: (chatKeys: string[]) => (dispatch: any) => void;
}

const SLIDE_IN = {
  display: "block",
  transform: "translateX(0)",
};

class Chat extends Component<ChatProps, Readonly<any>> {
  userId: string;
  notificationSound: HTMLAudioElement;
  chatRef = app.database().ref("chats");

  constructor(props: ChatProps) {
    super(props);

    this.state = {
      messageText: "",
      chats: {},
      currentChatKey: "",
      currentFriendKey: "",
      friends: {},
      chatTitle: "BlazeHub",
      loading: true,
      loadingChat: false,
      slideInStyle: {},
      chatsHeight: 300,
      avatar: "",
    };

    this.userId = this.getUserKey(props.auth.user.email);
    this.props.getFriends();
    this.notificationSound = new Audio(notificationSound);
  }

  componentDidMount() {
    // this.setupFirebase();

    const { profile, auth } = this.props;
    if (profile.avatar) {
      this.setState({
        // loadingAvatar: false,
        avatar: profile.avatar,
      });
    } else {
      this.props.getProfilePic(auth.user.id, "avatar");
    }

    this.setChatsHeight();

    window.addEventListener("resize", () => {
      this.setChatsHeight();
    });
  }

  componentWillReceiveProps(nextProps: any) {
    if (
      nextProps.profile.avatar &&
      nextProps.profile.avatar !== this.state.avatar
    ) {
      this.setState({
        // loadingAvatar: false,
        avatar: nextProps.profile.avatar,
      });
    }

    this.updateFriends(nextProps);
    this.updateChats(nextProps);

    this.setChatsHeight();
  }

  updateFriends = ({ friends }: any) => {
    // const { friends } = nextProps;
    const friendKeys: string[] = Object.keys(friends);

    if (friendKeys.length > 0) {
      const newFriendKeys = this.arrayDiff(
        friendKeys,
        Object.keys(this.state.friends)
      );
      if (newFriendKeys.length > 0) {
        this.props.listenForNewChats(
          newFriendKeys.map((friendKey: string) => this.getChatKey(friendKey))
        );

        // update UI with new friends
        this.setState({
          friends,
          loading: false,
        });
      } else if (
        JSON.stringify(friends) !== JSON.stringify(this.state.friends)
      ) {
        this.setState({
          friends,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }
  };

  updateChats = ({ chats }: any) => {
    const { currentChatKey } = this.state;
    const stateChats = this.state.chats;

    if (chats[currentChatKey]) {
      const messageKeys = Object.keys(chats[currentChatKey]);
      const newMessageKey = messageKeys[messageKeys.length - 1];
      stateChats[currentChatKey][newMessageKey] =
        chats[currentChatKey][newMessageKey];
      this.setState({ chats: stateChats }, () => {
        const chatMessagesDiv = document.getElementById(
          "chat-messages"
        ) as HTMLElement;
        // this.pageSmootScroll(chatMessagesDiv, chatMessagesDiv.scrollHeight);
        chatMessagesDiv.scrollTo({
          behavior: "smooth",
          top: chatMessagesDiv.scrollHeight - chatMessagesDiv.clientHeight,
        });
        if (chats[currentChatKey][newMessageKey].user.key !== this.userId)
          this.notificationSound.play();
      });
    } else {
      // update UI with notification indicating message from another user
    }
  };

  pageSmootScroll = (elem: HTMLElement, to: number, current = -1) => {
    if (current === -1) current = elem.scrollTop + elem.clientHeight;
    // document.getElementById('').clientHeight
    elem.scrollBy(0, 10);
    // console.log("scrolling")
    if (
      elem.scrollTop < to + elem.clientHeight &&
      current !== elem.scrollHeight
    )
      setTimeout(
        this.pageSmootScroll,
        10,
        elem,
        to,
        elem.scrollTop + elem.clientHeight
      );
  };

  /**
   * @param {any[]} a
   * @param {any[]} b
   */
  arrayDiff = (a: any[], b: any[]) => a.filter((val) => b.indexOf(val) < 0);

  setChatsHeight = () => {
    // console
    const K = window.innerWidth > window.innerHeight ? 0.03 : 0.1;
    this.setState({
      chatsHeight: window.innerHeight - (170 + K * window.innerWidth),
    });
  };

  // setupFirebase = () => {
  //   const db = app.database();
  //   this.chatRef = db.ref("chats");
  // };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /** @param {string} userEmail */
  getUserKey = (userEmail: string) =>
    userEmail.replace(/\./g, "~").replace(/@/g, "~~");

  /** @param {string} friendKey */
  getChatKey = (friendKey: string) => [this.userId, friendKey].sort().join("_");

  openChat = (key: string) => {
    this.toggleFriends();

    // this.setState({  });
    this.setState(
      {
        // chats: [],
        currentFriendKey: key,
        currentChatKey: this.getChatKey(key),
        loadingChat: true,
        chatTitle: this.state.friends[key].name,
      },
      () => {
        this.chatRef
          .child(this.state.currentChatKey)
          .once("value", (chatSnapShot) => {
            const { chats } = this.state;
            chats[this.state.currentChatKey] = chatSnapShot.val() || {};
            this.setState(
              {
                loadingChat: false,
                chats,
              },
              () => {
                const chatMessagesDiv = document.getElementById(
                  "chat-messages"
                ) as HTMLElement;
                chatMessagesDiv.scrollTo({
                  behavior: "auto",
                  top:
                    chatMessagesDiv.scrollHeight - chatMessagesDiv.clientHeight,
                });
              }
            );
          });
      }
    );
  };

  sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { messageText, currentChatKey } = this.state;
    if (event.which === 13 && messageText !== "") {
      const { user } = this.props.auth;
      const newMessage = {
        text: messageText,
        date: Date.now(),
        // todo: add user url (from profile: auto-generate if not manually set by user)
        user: {
          name: `${user.firstName}`,
          key: this.userId,
        },
      };

      this.setState({ messageText: "" });
      // event.target.value = "";

      this.chatRef.child(currentChatKey).push(newMessage, (err) => {
        if (err) {
          // console.error(err);
        }
        // this.notificationSound.play();
        // else console.log("chat added");
      });
    }
  };

  toggleFriends = () => {
    this.setState({
      slideInStyle: this.state.slideInStyle === SLIDE_IN ? {} : SLIDE_IN,
    });
  };

  render() {
    const {
      loading,
      avatar,
      friends,
      chatTitle,
      slideInStyle,
      chatsHeight,
      currentFriendKey,
      currentChatKey,
      chats,
      loadingChat,
      messageText,
    } = this.state;
    const friendKeys = Object.keys(friends);

    return (
      <PageTemplate
        wrapperClass="container chat-page"
        history={this.props.history}
      >
        <div className="chat-space">
          <header>
            <div className="icon-text">
              {/* <FontAwesomeIcon icon={faUserCircle} /> */}
              {friends[currentFriendKey] && friends[currentFriendKey].avatar ? (
                <Avatar
                  avatar={friends[currentFriendKey].avatar}
                  marginRight="0.5em"
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="icon" />
              )}
              <h3>{chatTitle}</h3>
            </div>

            <div
              id={this.state.slideInStyle === SLIDE_IN ? "burger-slided" : ""}
              className="burger"
              onClick={this.toggleFriends}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </header>

          <div style={{ height: `${chatsHeight}px` }} className="chats">
            <div id="chat-messages" className="chat-messages">
              {loadingChat ? (
                <Spinner />
              ) : (
                chats[currentChatKey] &&
                Object.keys(chats[currentChatKey]).map(
                  (messageKey, idx, messageKeys) => {
                    const message = chats[currentChatKey][messageKey];
                    const timeString = new Date(message.date)
                      .toLocaleTimeString()
                      .split(":");
                    const meridiem = timeString[2].split(" ")[1];
                    const time = `${timeString[0]}:${timeString[1]} ${
                      meridiem || ""
                    }`;
                    const prevMessageKey =
                      idx === 0 ? messageKey : messageKeys[idx - 1];

                    const currentChat = chats[currentChatKey][prevMessageKey];
                    const currentUserKey =
                      (currentChat.user && currentChat.user.key) ||
                      currentChat.userID;
                    const messageUserKey: string =
                      (message.userID && message.userID) || message.user.key;

                    if (messageUserKey === this.userId)
                      return (
                        <div
                          key={messageKey}
                          className="chat chat-me"
                          style={{
                            marginTop:
                              prevMessageKey &&
                              currentUserKey !== messageUserKey
                                ? "1.3em"
                                : "0.5em",
                          }}
                        >
                          {avatar ? (
                            <Avatar avatar={avatar} />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              className="icon"
                            />
                          )}
                          <div>
                            <p>{message.text}</p>
                            <small>{time}</small>
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div
                          key={messageKey}
                          className="chat chat-other"
                          style={{
                            marginTop:
                              prevMessageKey &&
                              currentUserKey !== messageUserKey
                                ? "1.3em"
                                : "0.5em",
                          }}
                        >
                          {friends[currentFriendKey] &&
                          friends[currentFriendKey].avatar ? (
                            <Avatar
                              avatar={friends[currentFriendKey].avatar}
                              marginRight="0"
                              marginLeft="1em"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              className="icon"
                            />
                          )}
                          <div>
                            {/* <h5>{message.user.name}</h5> */}
                            <p>{message.text}</p>
                            <small>{time}</small>
                          </div>
                        </div>
                      );
                  }
                )
              )}
            </div>

            {chatTitle !== "BlazeHub" && (
              <div className="chat-input">
                <input
                  type="text"
                  name="messageText"
                  placeholder="Type a message"
                  onChange={this.onChange}
                  onKeyPress={this.sendMessage}
                  value={messageText}
                />
                {/* <button>
                  <FontAwesomeIcon icon={faSmile} className="icon" />
                </button> */}
              </div>
            )}
          </div>
        </div>

        <div className="friends" style={slideInStyle}>
          {loading ? (
            <Spinner />
          ) : (
            friendKeys.map((friendKey) => {
              const friend = friends[friendKey];
              // console.log(friend);

              return (
                <div key={friendKey}>
                  <div
                    className="friend"
                    onClick={(e) => this.openChat(friendKey)}
                  >
                    {friend.avatar ? (
                      <Avatar avatar={friend.avatar} />
                    ) : (
                      <FontAwesomeIcon icon={faUserCircle} className="icon" />
                    )}
                    <p>{friend.name}</p>
                  </div>

                  {friendKeys.length === 1 && (
                    <div style={{ textAlign: "center", marginTop: "2em" }}>
                      <Link to="/find">
                        <button className="btn">Find Friends</button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  profile: state.profile,
  friends: state.friends,
  chats: state.chats,
});

export const ChatPage = connect<any>(mapStateToProps, {
  getProfilePic,
  getFriends,
  listenForNewChats,
})(Chat);
