import React, { Component } from "react";
import { connect } from "react-redux";
import {
  faBookmark,
  faSignOutAlt,
  faUsers,
  faUserFriends,
  faHands,
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.scss";
import { AuthState } from "../models/auth";
import { signoutUser } from "../store/actions/auth";
import { NavItem } from "../components/molecules";
import { PageTemplate } from "../components/templates";

interface MenuProps {
  auth: AuthState;
  signoutUser: () => (dispatch: any) => void;
}

class Menu extends Component<MenuProps> {
  render() {
    return (
      <PageTemplate wrapperClass="container menu">
        <ul className="menu-items">
          <NavItem
            link="/bookmarks"
            text="Bookmarks"
            icon={faBookmark}
            nav={false}
          />
          <NavItem
            link="/find"
            text="Find Friends"
            icon={faUsers}
            nav={false}
          />
          <NavItem
            link="/invite"
            text="Invite Friends"
            icon={faUserFriends}
            nav={false}
          />
          <NavItem
            link="/feedback"
            text="Feedback"
            icon={faHands}
            nav={false}
          />
          <NavItem
            link="#"
            text="Sign Out"
            icon={faSignOutAlt}
            className="hide-wide"
            onClick={this.props.signoutUser}
            nav={false}
          />
        </ul>
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export const MenuPage = connect<any>(mapStateToProps, { signoutUser })(Menu);
