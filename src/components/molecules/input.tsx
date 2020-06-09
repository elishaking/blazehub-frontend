import React, { HTMLProps } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { Input } from "../atoms";

interface TextFormInputProps extends HTMLProps<HTMLInputElement> {
  icon?: IconDefinition;
  error?: string;
}

const errorStyle = css`
  border: 1px solid red;

  &:focus {
    box-shadow: 0 0 8px 0 rgb(255, 149, 149);
  }
`;

const iconInputStyle = css`
  position: relative;

  ${Input} {
    padding-left: 3em;
  }

  svg {
    position: absolute;
    top: 1em;
    left: 1em;
    color: #b1a3e1;
  }
`;

const Wrapper = styled.div<Pick<TextFormInputProps, "icon" | "error">>`
  ${Input} {
    ${(props) => props.error && errorStyle}
  }

  ${(props) => props.icon && iconInputStyle}

  small {
    display: block;
    color: red;
  }
`;

export const TextFormInput = ({
  icon,
  error,
  ...rest
}: Omit<TextFormInputProps, "ref" | "as">) => {
  return (
    <Wrapper error={error} icon={icon} className="form-input">
      {icon && <FontAwesomeIcon icon={icon} className="icon" />}
      <Input {...rest} />
      <AnimatePresence>
        {error && (
          <motion.small
            initial={{ opacity: 0, fontSize: "0em" }}
            animate={{ opacity: 1, fontSize: "0.8em" }}
            exit={{ opacity: 0, fontSize: "0em" }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.small>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
