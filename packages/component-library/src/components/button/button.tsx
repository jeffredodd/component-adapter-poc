import React, { useEffect } from "react";
import { ButtonHTMLAttributes } from "react";

// Link Button might need to be seperate components
export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  "data-testid"?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onFocus?: () => void;
  onRender?: () => void;
}

export const Button = ({ children, onRender, ...props }: ButtonProps) => {
  // Only fire on componentDidMount
  useEffect(() => {
    onRender?.();
  }, []);

  return <button {...props}>{children}</button>;
};
