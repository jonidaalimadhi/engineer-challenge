import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("SearchBar input value", () => {
  test("updates successfully on letter change", () => {
    render(<App />);
    expect(screen.getByTestId("search-bar")).toHaveDisplayValue("");
    fireEvent.change(screen.getByTestId("search-bar"), {
      target: { value: "test" },
    });
    expect(screen.getByTestId("search-bar")).toHaveDisplayValue("test");
  });

  test("does not update on non letter character", () => {
    render(<App />);
    expect(screen.getByTestId("search-bar")).toHaveDisplayValue("");
    fireEvent.change(screen.getByTestId("search-bar"), {
      target: { value: "12*/" },
    });
    expect(screen.getByTestId("search-bar")).toHaveDisplayValue("");
  });
});
