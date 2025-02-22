import type { MetaFunction } from "@remix-run/node";
import { useContext } from "react";
import { ComponentsContext, ComponentsContextType } from "component-library";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const Components: ComponentsContextType = useContext(ComponentsContext);

  return (
    <div>
      <h1>Welcome to Remix!</h1>
      <Components.Button>Click Me</Components.Button>
      <Components.Input label="test input" placeholder="Type something..." />
      <Components.Table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
        </thead>
      </Components.Table>
    </div>
  );
}
