import { Button, Input, Table, ButtonProps, InputProps } from "@mui/material";
import { ComponentsContextType } from "component-library";

export const muiAdapter: Partial<ComponentsContextType> = {
  Button: (props) => (
    <Button className="test" color="primary" {...(props as ButtonProps)}>
      Hi
    </Button>
  ),
  Input: (props) => (
    <Input placeholder="Type something..." {...(props as InputProps)} />
  ),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        width: "100%",
        borderCollapse: "collapse",
        "& th, td": {
          border: "1px solid black",
          padding: "8px",
        },
      }}
    />
  ),
};
