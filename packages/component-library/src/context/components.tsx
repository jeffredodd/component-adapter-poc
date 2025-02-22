import {
  Button,
  ButtonProps,
} from "@component-library/components/button/button";
import { Input, InputProps } from "@component-library/components/input/input";
import { Table, TableProps } from "@component-library/components/table/table";
import React, { createContext } from "react";

export interface ComponentsContextType {
  ButtonComponent: (props: ButtonProps) => JSX.Element | null;
  InputComponent: (props: InputProps) => JSX.Element | null;
  TableComponent: (props: TableProps) => JSX.Element | null;
}

const defaultComponents: ComponentsContextType = {
  ButtonComponent: (props: ButtonProps) => <Button {...props} />,
  InputComponent: (props: InputProps) => <Input {...props} />,
  TableComponent: (props: TableProps) => <Table {...props} />,
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
