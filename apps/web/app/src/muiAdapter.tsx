import { Button, Input } from "@mui/material";
import {
  ButtonProps,
  ComponentsContextType,
  InputProps,
} from "component-library";

export const muiAdapter: Partial<ComponentsContextType> = {
  Button: (props: ButtonProps) => {
    const { variant = "primary", ...buttonProps } = props;
    const colorMap: {
      [key: string]: "primary" | "secondary" | "info" | undefined;
    } = {
      primary: "primary",
      secondary: "secondary",
      tertiary: "info",
    };
    return (
      <Button
        className="example-class"
        color={colorMap[variant]}
        {...buttonProps}
      >
        Hi
      </Button>
    );
  },
  Input: (props: InputProps) => {
    const { onBlur, ...inputProps } = props;
    return (
      <Input
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          // Custom blur code could go here
          onBlur?.(e);
        }}
        placeholder="Type something..."
        {...inputProps}
      />
    );
  },
};
