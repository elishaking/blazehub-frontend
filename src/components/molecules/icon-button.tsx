import React, { HTMLProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FlatButton } from "../atoms";

interface IconButtonProps extends HTMLProps<HTMLButtonElement> {
  icon: IconDefinition;
  type?: "button" | "submit" | "reset";
}

export const IconButton = ({
  icon,
  style,
  ...rest
}: Omit<IconButtonProps, "ref" | "as">) => {
  return (
    <FlatButton style={{ ...style, padding: "0" }} {...rest}>
      <FontAwesomeIcon icon={icon} />
    </FlatButton>
  );
};
