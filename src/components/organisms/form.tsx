import React, { HTMLProps } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage } from "../atoms";

interface FormProps extends HTMLProps<HTMLFormElement> {
  error?: string;
  children: React.ReactNode;
}

const Wrapper = styled.form`
  .form-input {
    margin-bottom: 1em;
  }
`;

export const Form = ({
  error,
  children,
  ...rest
}: Omit<FormProps, "ref" | "as">) => {
  return (
    <Wrapper {...rest}>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, transform: "scale(0)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0)" }}
            transition={{ duration: 0.2 }}
          >
            <ErrorMessage>{error}</ErrorMessage>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </Wrapper>
  );
};
