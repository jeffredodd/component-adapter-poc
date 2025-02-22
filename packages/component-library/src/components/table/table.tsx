import React from "react";

export type TableProps = {
  children: React.ReactNode;
};

export const Table = ({ children }: TableProps) => {
  return <table>{children}</table>;
};

export const TableHead = ({ children }: TableProps) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: TableProps) => {
  return <tr>{children}</tr>;
};

export const TableCell = ({ children }: TableProps) => {
  return <td>{children}</td>;
};

export const TableHeader = ({ children }: TableProps) => {
  return <th>{children}</th>;
};

export const TableCaption = ({ children }: TableProps) => {
  return <caption>{children}</caption>;
};

export const TableFooter = ({ children }: TableProps) => {
  return <tfoot>{children}</tfoot>;
};

export const TableCol = ({ children }: TableProps) => {
  return <col>{children}</col>;
};

export const TableColGroup = ({ children }: TableProps) => {
  return <colgroup>{children}</colgroup>;
};
