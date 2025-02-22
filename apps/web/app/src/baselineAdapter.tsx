import { ComponentsContextType } from "component-library";

export const baselineAdapter: Partial<ComponentsContextType> = {
  Button: (props) => (
    <button
      className="test"
      color="primary"
      style={{
        fontSize: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        border: "none",
        backgroundColor: "#0070f3",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
        transition: "background-color 0.2s ease",
      }}
      {...props}
    />
  ),
  Input: (props) => (
    <input
      placeholder="Type something..."
      style={{
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        border: "1px solid #eaeaea",
        borderRadius: "0.25rem",
        width: "100%",
      }}
      {...props}
    />
  ),
  Table: (props) => (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        border: "1px solid #eaeaea",
      }}
      {...props}
    />
  ),
};
