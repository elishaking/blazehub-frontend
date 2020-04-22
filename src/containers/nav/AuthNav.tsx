import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { signoutUser } from "../../actions/authActions";
import Avatar from "../../components/Avatar";
import "./AuthNav.scss";
import { TextIconFormInput } from "../../components/form/TextFormInput";
import Logo from "../../components/Logo";

interface AuthNavProps extends RouteComponentProps {
  showSearch: boolean;
  avatar?: string;
  notificationsRef: any;
  user: any;
  signoutUser: () => (dispatch: any) => void;
}

// type AuthNavProps = StateProps & DispatchProps & ComponentProps;

class AuthNav extends Component<AuthNavProps, Readonly<any>> {
  state = {
    notifications: [],
    loading: true,
  };

  componentDidMount() {
    // this.getNotifications();
  }

  getNotifications = () => {
    // console.log(this.props.hello)
    this.props.notificationsRef
      .child(this.props.user.id)
      .orderByChild("date")
      .on("child_added", (newNotificationSnapShot: any) => {
        const newNotification = {
          key: newNotificationSnapShot.key,
          ...newNotificationSnapShot.val(),
        };

        // set date
        newNotification.date = 1e15 - newNotification.date;

        if (this.state.loading) this.setState({ loading: false });

        const { notifications } = this.state;
        // newNotification.date > this.mountedOn ? notifications.unshift(newNotification) : notifications.push(newNotification);
        this.setState({
          notifications,
        });
      });
  };

  signOut = () => this.props.signoutUser();

  openNotifications = () => {
    // console.log("open");
  };

  search = () => {
    // console.log("performing search");
  };

  render() {
    const { notifications } = this.state;
    const { user, showSearch, avatar = "" } = this.props;
    const {
      firstName,
      // lastName
    } = user;

    return (
      <header>
        <nav className="auth-nav">
          <h1 className="logo">
            <Logo style={{ fontSize: "1.5em" }} />
            <span>BlazeHub</span>
            <small>Beta</small>
          </h1>

          {showSearch && (
            <div className="search">
              <TextIconFormInput
                type="email"
                name="signinEmail"
                placeholder="email"
                onChange={this.search}
                error={""}
                icon={faSearch}
              />
            </div>
          )}

          <div className="auth-nav-right">
            {avatar ? (
              <Avatar avatar={avatar} />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
            )}{" "}
            &nbsp;&nbsp;&nbsp;
            {/* <span>{`${firstName} ${lastName}`}</span> */}
            <span>{`${firstName}`}</span>
            <div id="notifications" onClick={this.openNotifications}>
              <FontAwesomeIcon icon={faBell} className="icon" />
              {notifications.length > 0 && (
                <div>
                  <small>{notifications.length}</small>
                </div>
              )}
            </div>
            <input
              type="button"
              value="Sign Out"
              className="btn-input"
              onClick={this.signOut}
            />
          </div>
        </nav>

        {showSearch && (
          <div className="alt-search">
            <div className="icon-input">
              <input type="text" placeholder="Search" />
              <FontAwesomeIcon icon={faSearch} className="icon" />
            </div>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect<any, any, any>(mapStateToProps, { signoutUser })(
  AuthNav
);

// export default function AuthNav({ user, signoutUser, history, hasProfilePic, showSearch = false }) {
//   const signOut = () => {
//     signoutUser();
//     history.push('/');
//   };

//   const { firstName, lastName } = user;
//   return (
//     <header>
//       <nav className="auth-nav">
//         <h1 className="logo">
//           <img src={`./assets/img/logo-pri.svg`} alt="Logo" srcSet="" /> <span>BlazeHub</span>
//         </h1>

//         {
//           showSearch && (
//             <div className="search">
//               <div className="icon-input">
//                 <input type="text" placeholder="Search" />
//                 <FontAwesomeIcon icon={faSearch} className="icon" />
//               </div>
//             </div>
//           )
//         }

//         <div className="auth-nav-right">
//           {hasProfilePic ? <img src="" alt={firstName} srcSet="" /> : <FontAwesomeIcon icon={faUserCircle} className="icon" />} &nbsp;&nbsp;&nbsp;
//               <span>{`${firstName} ${lastName}`}</span>
//           <input type="button" value="Sign Out" className="btn-input" onClick={signOut} />
//         </div>
//       </nav>

//       {
//         showSearch && (
//           <div className="alt-search">
//             <div className="icon-input">
//               <input type="text" placeholder="Search" />
//               <FontAwesomeIcon icon={faSearch} className="icon" />
//             </div>
//           </div>
//         )
//       }
//     </header>
//   )
// }
