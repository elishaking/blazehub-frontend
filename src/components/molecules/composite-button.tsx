import React, { HTMLProps } from "react";
import styled from "styled-components";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { OutlineButton, Button } from "../atoms";
import Spinner from "../Spinner";

type ButtonType = "primary" | "outline";

interface CompositeButtonProps extends HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: IconDefinition;
  kind?: ButtonType;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Wrapper = styled.span`
  button {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: inline-block;
    }

    /* span.text {
      font-size: 1.3em;
    }

    .spinner {
      font-size: 1.3em;
    } */

    svg:not(.spinner) {
      /* font-size: 1.7em; */
      fill: white;
      margin-right: 0.7em;
    }
  }
`;

export const CompositeButton = ({
  icon,
  children,
  kind = "primary",
  loading = false,
  ...rest
}: Omit<CompositeButtonProps, "ref" | "as">) => {
  const getButton = () => {
    if (kind === "outline")
      return <OutlineButton {...rest}>{children}</OutlineButton>;

    return (
      <Button {...rest}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <span className="text">{children}</span>
      </Button>
    );
  };

  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter key={loading ? 1 : 0}>
        {
          <motion.div
            initial={{ opacity: 0, transform: "scale(0)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0)" }}
            transition={{ duration: 0.2 }}
            style={{ width: "fit-content" }}
          >
            {loading ? <Spinner padding={false} /> : getButton()}
          </motion.div>
        }
      </AnimatePresence>
    </Wrapper>
  );
};
