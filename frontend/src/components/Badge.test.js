import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

test("renders the badge with correct status ", () => {
  render(<Badge text={"ACTIVE"} />);
  expect(screen.getByTestId("badge-element")).toHaveTextContent("ACTIVE");
});

test("renders the badge with correct name surname ", async () => {
  render(<Badge text={"Name Surname"} />);
  expect(screen.getByTestId("badge-element")).toHaveTextContent("Name Surname");
});
