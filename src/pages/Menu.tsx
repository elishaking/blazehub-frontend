import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserAlt,
  faComments,
  faBookmark,
  faSignOutAlt,
  faUsers,
  faUserFriends,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";

import AuthNav from "../containers/nav/AuthNav";
import MainNav from "../containers/nav/MainNav";
import { AuthState } from "../models/auth";
import { signoutUser } from "../actions/authActions";

interface MenuProps {
  auth: AuthState;
  signoutUser: () => (dispatch: any) => void;
}

class Menu extends Component<MenuProps> {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <AuthNav />

        <div className="main">
          <MainNav user={user} />

          <ul>
            <li>
              <Link to="/bookmarks">
                <FontAwesomeIcon icon={faBookmark} /> <span>Bookmarks</span>
              </Link>
            </li>
            <li>
              <Link to="/find">
                <FontAwesomeIcon icon={faUsers} /> <span>Find Friends</span>
              </Link>
            </li>
            <li>
              <Link to="/invite">
                <FontAwesomeIcon icon={faUserFriends} />{" "}
                <span>Invite Friends</span>
              </Link>
            </li>
            <li className="hide-wide">
              <Link to="#" onClick={this.props.signoutUser}>
                <FontAwesomeIcon icon={faSignOutAlt} /> <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect<any>(mapStateToProps, { signoutUser })(Menu);
