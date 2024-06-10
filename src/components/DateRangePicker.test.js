import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DateRangePicker from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("should render date inputs and button", () => {
    render(
      <DateRangePicker
        startDate=""
        endDate=""
        setStartDate={() => {}}
        setEndDate={() => {}}
        setDateRange={() => {}}
      />
    );

    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply/i)).toBeInTheDocument();
  });

  it("should call setDateRange with correct values when apply button is clicked", () => {
    const setDateRangeMock = jest.fn();
    render(
      <DateRangePicker
        startDate=""
        endDate=""
        setStartDate={() => {}}
        setEndDate={() => {}}
        setDateRange={setDateRangeMock}
      />
    );

    act(() => {
      fireEvent.change(screen.getByLabelText(/Start Date/i), {
        target: { value: "2023-01-01" },
      });
      fireEvent.change(screen.getByLabelText(/End Date/i), {
        target: { value: "2023-01-10" },
      });
      fireEvent.click(screen.getByText(/Apply/i));
    });

    expect(setDateRangeMock).toHaveBeenCalledWith({
      startDate: "2023-01-01",
      endDate: "2023-01-10",
    });
  });
});
