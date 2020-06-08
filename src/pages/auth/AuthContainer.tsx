import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../components/Logo";
import { Button } from "../../components/atoms";

interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  const [navLogoColor, setNavLogoColor] = useState("#fff");
  const history = useHistory();

  useEffect(() => {
    const resize = () => {
      const newLogoColor = window.innerWidth > 1000 ? "#fff" : "";
      if (navLogoColor !== newLogoColor) {
        setNavLogoColor(newLogoColor);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [navLogoColor]);

  const baseUrl = window.location.origin;
  return (
    <div className="container landing-bg">
      <header>
        <nav>
          <h1>
            <Logo color={navLogoColor} style={{ fontSize: "1.3em" }} />
            <span>BlazeHub</span>
          </h1>

          <Button onClick={() => history.push("/signin")}>Sign in</Button>
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
            <div className="welcome">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
