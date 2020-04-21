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
}

export default function NavItem({
  link,
  text,
  icon,
  className,
  onClick,
}: NavItemProps) {
  return (
    <li className={`nav-item ${className}`}>
      <Link to={link} onClick={onClick}>
        <FontAwesomeIcon icon={icon} /> <span>{text}</span>
      </Link>
    </li>
  );
}
