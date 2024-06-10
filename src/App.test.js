import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders the app component", () => {
    render(<App />);
    expect(screen.getByText(/Weather Dashboard/i)).toBeInTheDocument();
  });
});
