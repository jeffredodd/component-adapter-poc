import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  Table,
  TableProps,
} from "../components";
import React, { createContext } from "react";

export interface ComponentsContextType {
  Button: (props: ButtonProps) => JSX.Element | null;
  Input: (props: InputProps) => JSX.Element | null;
  Table: (props: TableProps) => JSX.Element | null;
}

const defaultComponents: ComponentsContextType = {
  Button: (props: ButtonProps) => <Button {...props} />,
  Input: (props: InputProps) => <Input {...props} />,
  Table: (props: TableProps) => <Table {...props} />,
};

export const ComponentsContext =
  createContext<ComponentsContextType>(defaultComponents);

interface ComponentsProviderProps {
  children: React.ReactNode;
  value?: Partial<ComponentsContextType>;
}

export const ComponentsProvider = ({
  children,
  value = {},
}: ComponentsProviderProps) => {
  const contextValue: ComponentsContextType = {
    ...defaultComponents,
    ...value,
  };

  return (
    <ComponentsContext.Provider value={contextValue}>
      {children}
    </ComponentsContext.Provider>
  );
};
