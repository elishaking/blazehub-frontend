import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faSignOutAlt,
  faUsers,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

import AuthNav from "../containers/nav/AuthNav";
import MainNav from "../containers/nav/MainNav";
import { AuthState } from "../models/auth";
import { signoutUser } from "../actions/authActions";
import NavItem from "../components/NavItem";

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
            <NavItem link="/bookmarks" text="Bookmarks" icon={faBookmark} />
            <NavItem link="/find" text="Find Friends" icon={faUsers} />
            <NavItem
              link="/invite"
              text="Invite Friends"
              icon={faUserFriends}
            />
            <NavItem
              link="#"
              text="Sign Out"
              icon={faSignOutAlt}
              className="hide-wide"
              onClick={signoutUser}
            />
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
