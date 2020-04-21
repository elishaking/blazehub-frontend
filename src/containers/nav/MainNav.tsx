import React from "react";
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
import { signoutUser } from "../../actions/authActions";
import "./MainNav.scss";
import { AuthUser } from "../../models/auth";

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
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <FontAwesomeIcon icon={faComments} /> <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserAlt} /> <span>Profile</span>
            </Link>
          </li>
          <li className="mobile-remove">
            <Link to="/bookmarks">
              <FontAwesomeIcon icon={faBookmark} /> <span>Bookmarks</span>
            </Link>
          </li>
          <li className="mobile-remove">
            <Link to="/find">
              <FontAwesomeIcon icon={faUsers} /> <span>Find Friends</span>
            </Link>
          </li>
          <li className="mobile-remove">
            <Link to="/invite">
              <FontAwesomeIcon icon={faUserFriends} />{" "}
              <span>Invite Friends</span>
            </Link>
          </li>
          <li className="hide-wide mobile-remove">
            <Link to="#" onClick={signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> <span>Sign Out</span>
            </Link>
          </li>
          <li className="mobile-add">
            <Link to="/menu">
              <FontAwesomeIcon icon={faHamburger} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default connect(null, { signoutUser })(MainNav);
