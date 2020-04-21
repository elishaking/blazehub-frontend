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
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { signoutUser } from "../../actions/authActions";
import "./MainNav.scss";
import { AuthUser } from "../../models/auth";
import NavItem from "../../components/NavItem";

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
            link="#"
            text="Sign Out"
            icon={faSignOutAlt}
            className="hide-wide mobile-remove"
            onClick={signOut}
          />

          <NavItem
            link="/menu"
            text=""
            icon={faHamburger}
            className="hide-wide mobile-add"
          />
        </ul>
      </nav>
    </div>
  );
}

export default connect(null, { signoutUser })(MainNav);
