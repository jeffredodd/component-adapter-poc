import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};
