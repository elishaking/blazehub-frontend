import React, { HTMLProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OutlineButton, Button } from "../atoms";
import Spinner from "../Spinner";

type ButtonType = "primary" | "outline";

interface CompositeButtonProps extends HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  kind?: ButtonType;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CompositeButton = ({
  children,
  kind = "primary",
  loading = false,
  ...rest
}: Omit<CompositeButtonProps, "ref" | "as">) => {
  const getButton = () => {
    if (kind === "outline")
      return <OutlineButton {...rest}>{children}</OutlineButton>;

    return <Button {...rest}>{children}</Button>;
  };

  return (
    <AnimatePresence exitBeforeEnter key={loading ? 1 : 0}>
      {
        <motion.div
          initial={{ opacity: 0, transform: "scale(0)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          exit={{ opacity: 0, transform: "scale(0)" }}
          transition={{ duration: 0.3 }}
          style={{ width: "fit-content" }}
        >
          {loading ? <Spinner padding={false} /> : getButton()}
        </motion.div>
      }
    </AnimatePresence>
  );
};
