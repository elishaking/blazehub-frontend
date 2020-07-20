import React from "react";

interface TProps {
  avatar: string;
  marginRight?: string;
  marginLeft?: string;
}

export function Avatar({
  avatar,
  marginRight = "1em",
  marginLeft = "0",
}: TProps) {
  return (
    <img
      src={avatar}
      alt="profile pic"
      style={{
        width: "40px",
        height: "40px",
        objectFit: "cover",
        border: "1px solid #a491c3",
        borderRadius: "100px",
        marginRight,
        marginLeft,
        boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
      }}
    />
  );
}
