import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("handles city search with error message", async () => {
    render(<App />);
    const input = screen.getByLabelText("Search city");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "InvalidCity" } });
    fireEvent.click(searchButton);

    const errorMessage = await screen.findByText(
      "An error occurred while verifying the city. Please try again."
    );

    expect(errorMessage).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "ValidCity" } });
    fireEvent.click(searchButton);

    const noErrorMessage = await screen.queryByText(
      "An error occurred while verifying the city. Please try again."
    );

    expect(noErrorMessage).not.toBeInTheDocument();
  });
});
