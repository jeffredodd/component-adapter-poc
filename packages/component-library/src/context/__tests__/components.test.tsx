import React, { useContext, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import {
  ComponentsProvider,
  ComponentsContext,
  ComponentsContextType,
} from "../components";
import userEvent from "@testing-library/user-event";
import { Button, Input } from "../../components";

describe("ComponentsContext", () => {
  it("provides default components", () => {
    const TestComponent = () => {
      const components = useContext(ComponentsContext);
      return (
        <div data-testid="test">
          <components.Button data-testid="button">Test</components.Button>
          <components.Input data-testid="input" label="Test" name="test" />
        </div>
      );
    };

    render(
      <ComponentsProvider>
        <TestComponent />
      </ComponentsProvider>
    );

    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should not cause unnecessary re-renders of context consumers", async () => {
    const buttonRenderCounter = vi.fn();
    const inputRenderCounter = vi.fn();
    // Mock adapter similar to muiAdapter
    const testAdapter: Partial<ComponentsContextType> = {
      Button: (props) => (
        <Button {...props} onRender={buttonRenderCounter}>
          Test Button
        </Button>
      ),
      Input: (props) => <Input {...props} onRender={inputRenderCounter} />,
    };

    // Component that uses context similar to _index.tsx
    const TestPage = () => {
      const Components = useContext(ComponentsContext);

      return (
        <div>
          <Components.Button data-testid="context-button">
            Click Me
          </Components.Button>
          <Components.Input
            data-testid="context-input"
            label="test input"
            placeholder="Type something..."
            name="test"
          />
        </div>
      );
    };

    // Parent component that might cause re-renders
    const App = () => {
      const [count, setCount] = useState(0);

      return (
        <ComponentsProvider value={testAdapter}>
          <button
            onClick={() => setCount((c) => c + 1)}
            data-testid="parent-button"
          >
            Parent Update ({count})
          </button>
          <TestPage />
        </ComponentsProvider>
      );
    };

    const { rerender } = render(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    // Trigger re-render
    rerender(<App />);

    const user = userEvent.setup();
    const parentButton = screen.getByTestId("parent-button");

    // Initial render
    expect(buttonRenderCounter).toHaveBeenCalledTimes(1);
    expect(inputRenderCounter).toHaveBeenCalledTimes(1);

    // Trigger parent updates
    await user.click(parentButton);
    await user.click(parentButton);

    // TestPage should not re-render when parent updates
    // since context values haven't changed
    expect(buttonRenderCounter).toHaveBeenCalledTimes(1);
    expect(inputRenderCounter).toHaveBeenCalledTimes(1);
  });

  // This test can be uncommented once immutability is implemented
  it("should prevent context updates from causing re-renders", () => {
    const buttonRenderCounter = vi.fn();
    const inputRenderCounter = vi.fn();
    const testAdapter: Partial<ComponentsContextType> = {
      Button: (props) => <Button {...props} onRender={buttonRenderCounter} />,
      Input: (props) => <Input {...props} onRender={inputRenderCounter} />,
    };

    const TestComponent = () => {
      const Components = useContext(ComponentsContext);
      return (
        <div>
          <Components.Button data-testid="context-button">
            Click Me
          </Components.Button>
        </div>
      );
    };

    const { rerender } = render(
      <ComponentsProvider value={testAdapter}>
        <TestComponent />
      </ComponentsProvider>
    );

    // Initial render
    expect(buttonRenderCounter).toHaveBeenCalledTimes(1);

    // Update context value with same shape
    const newAdapter = {
      Button: (props) => (
        <Button
          {...props}
          onRender={buttonRenderCounter}
          data-testid="second-button"
        />
      ),
      Input: (props) => (
        <Input
          {...props}
          onRender={inputRenderCounter}
          data-testid="second-input"
        />
      ),
    };

    rerender(
      <ComponentsProvider value={newAdapter}>
        <TestComponent />
      </ComponentsProvider>
    );

    // Should not cause re-render since values are equivalent
    expect(buttonRenderCounter).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("second-button")).toBeNull();
  });

  it("should handle large state changes to components being used from the component context", async () => {
    const inputRenderCounter = vi.fn();
    const testAdapter: Partial<ComponentsContextType> = {
      Input: (props) => <Input {...props} onRender={inputRenderCounter} />,
    };

    const TestComponent = () => {
      const Components = useContext(ComponentsContext);
      const [demoData, setDemoData] = useState({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St",
        phone: "123-456-7890",
        website: "https://www.john.com",
        companyName: "Acme Inc",
        catchPhrase: "Quality over quantity",
        bs: "sell high, buy low",
      });

      const newDemoData = {
        id: 1,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        address: "321 Main St",
        phone: "321-654-0987",
        website: "https://www.jane.com",
        companyName: "Emca Inc",
        catchPhrase: "Quantity over quality",
        bs: "sell low, buy high",
      };
      return (
        <>
          <Components.Input
            name="name"
            value={demoData.name}
            label={"Name"}
            data-testid="name-input"
          />
          <Components.Input
            name="email"
            value={demoData.email}
            label={"Email"}
          />
          <Components.Input
            name="phone"
            value={demoData.phone}
            label={"Phone"}
          />
          <Components.Input
            name="website"
            value={demoData.website}
            label={"Website"}
          />
          <Components.Input
            name="company"
            value={demoData.companyName}
            label={"Company"}
          />
          <button
            onClick={() => setDemoData(newDemoData)}
            data-testid="update-button"
          >
            Update
          </button>
        </>
      );
    };

    const { rerender } = render(
      <ComponentsProvider value={testAdapter}>
        <TestComponent />
      </ComponentsProvider>
    );

    // Initial render should call onRender once per input
    expect(inputRenderCounter).toHaveBeenCalledTimes(5);

    // Update the demo data
    const updateButton = screen.getByText("Update");
    await act(async () => {
      await userEvent.click(updateButton);
    });

    // Should not trigger additional renders since only props changed
    const nameInput = screen.getByTestId("name-input");
    expect(nameInput).toHaveValue("Jane Doe");
    expect(inputRenderCounter).toHaveBeenCalledTimes(5);
  });
});
