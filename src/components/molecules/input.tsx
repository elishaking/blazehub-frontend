import React, { HTMLProps } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { Input } from "../atoms";

interface TextFormInputProps extends HTMLProps<HTMLInputElement> {
  error?: string;
}

const errorStyle = css`
  border: 1px solid red;

  &:focus {
    box-shadow: 0 0 8px 0 rgb(255, 149, 149);
  }
`;

const Wrapper = styled.div<Pick<TextFormInputProps, "error">>`
  ${Input} {
    ${(props) => props.error && errorStyle}
  }

  small {
    display: block;
    color: red;
  }
`;

export const TextFormInput = ({
  error,
  ...rest
}: Omit<TextFormInputProps, "ref" | "as">) => {
  return (
    <Wrapper error={error} className="form-input">
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
