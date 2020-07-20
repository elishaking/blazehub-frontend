import React from "react";
import { connect } from "react-redux";
import {
  faHome,
  faUserAlt,
  faComments,
  faBookmark,
  faSignOutAlt,
  faUsers,
  faUserFriends,
  faBars,
  faHands,
} from "@fortawesome/free-solid-svg-icons";

import "./main-nav.scss";
import { signoutUser } from "../../store/actions/auth";
import { AuthUser } from "../../models/auth";
import { NavItem } from "../../components/molecules";

interface MainNavProps {
  user: AuthUser;
  signoutUser: any;
}

function MainNav({ user, signoutUser: signoutUserFunc }: MainNavProps) {
  const { firstName, lastName } = user;
  const signOut = () => signoutUserFunc();

  return (
    <div className="main-nav">
      <header>
        <h3>{`${firstName} ${lastName}`}</h3>
      </header>
      <nav>
        <ul>
          <NavItem link="/home" text="Home" icon={faHome} />
          <NavItem link="/chat" text="Chat" icon={faComments} />
          <NavItem link="/profile" text="Profile" icon={faUserAlt} />
          <NavItem
            link="/bookmarks"
            text="Bookmarks"
            icon={faBookmark}
            className="mobile-remove"
          />
          <NavItem
            link="/find"
            text="Find Friends"
            icon={faUsers}
            className="mobile-remove"
          />
          <NavItem
            link="/invite"
            text="Invite Friends"
            icon={faUserFriends}
            className="mobile-remove"
          />
          <NavItem
            link="/feedback"
            text="Feedback"
            icon={faHands}
            className="mobile-remove"
          />
          <NavItem
            link="#"
            text="Sign Out"
            icon={faSignOutAlt}
            className="hide-wide mobile-remove"
            onClick={signOut}
          />

          <NavItem
            link="/menu"
            text=""
            icon={faBars}
            className="hide-wide mobile-add"
          />
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export const MainNavbar = connect(mapStateToProps, { signoutUser })(MainNav);
