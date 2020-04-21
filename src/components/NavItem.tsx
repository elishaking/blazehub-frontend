import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import "./NavItem.scss";

interface NavItemProps {
  link: string;
  text: string;
  icon: IconDefinition;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  nav?: boolean;
}

export default function NavItem({
  link,
  text,
  icon,
  className,
  onClick,
  nav = true,
}: NavItemProps) {
  return (
    <li className={`nav-item ${className} ${nav ? "" : "bigger"}`}>
      <Link to={link} onClick={onClick}>
        <FontAwesomeIcon className={`${nav ? "nav" : ""}`} icon={icon} />{" "}
        <span className={`${nav ? "nav" : ""}`}>{text}</span>
      </Link>
    </li>
  );
}
