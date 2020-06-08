import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../components/Logo";
import { Button } from "../../components/atoms";

export default class AuthContainer extends Component {
  state = {
    navLogoColor: "#fff",
  };
  history: any;

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.history = useHistory();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const newLogoColor = window.innerWidth > 1000 ? "#fff" : undefined;
    if (this.state.navLogoColor !== newLogoColor) {
      this.setState({
        navLogoColor: newLogoColor,
      });
    }
  };

  render() {
    const { navLogoColor } = this.state;
    const baseUrl = window.location.origin;
    return (
      <div className="container landing-bg">
        <header>
          <nav>
            <h1>
              <Logo color={navLogoColor} style={{ fontSize: "1.3em" }} />
              <span>BlazeHub</span>
            </h1>

            <Button onClick={() => this.history.push("/")}>Sign in</Button>
          </nav>
        </header>

        <div className="content">
          <div className="left">
            <div className="inner">
              <div className="info">
                <ul>
                  <li>
                    <img
                      src={`${baseUrl}/assets/img/connect.svg`}
                      alt="Connection"
                      srcSet=""
                    />
                    <h2>Connect With Friends</h2>
                  </li>
                  <li>
                    <img
                      src={`${baseUrl}/assets/img/converse.svg`}
                      alt="Conversation"
                      srcSet=""
                    />
                    <h2>Chat, Share Photos, Videos and more</h2>
                  </li>
                  <li>
                    <img
                      src={`${baseUrl}/assets/img/commune.svg`}
                      alt="Community"
                      srcSet=""
                    />
                    <h2>Be a part of a growing community</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="inner">
              <div className="welcome">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
