import App from "./App";
import { test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TodoTable from "./TodoTable";

test("renders App component", () => {
  // renders the App component for testing
  render(<App />);
  const header = screen.getByText(/My Todolist/i);
  expect(header).toBeInTheDocument();
});

test("renders todotable", () => {
  const row = [{ desc: "Go to coffee", date: "24.01.2023" }];
  render(<TodoTable todos={row} />);
  const table = screen.getByRole("table");
  expect(table).toHaveTextContent(/go to coffee/i);
});

test("add todo", () => {
  render(<App />);
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "29.01.2023" } });
  const button = screen.getByText("Add");
  fireEvent.click(button);
  const table = screen.getByRole("table");
  expect(table).toHaveTextContent(/go to coffee/i);
});

test("clear", () => {
    render(<App />);
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });
    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2023" } });
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);
    const table = screen.getByRole("todos");
    expect(table).toBeEmptyDOMElement();
  });
  
