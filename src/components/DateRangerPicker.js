import React, { useState } from "react";
import dayjs from "dayjs";

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDateRange,
}) => {
  const [error, setError] = useState("");

  const handleDateChange = () => {
    if (!startDate || !endDate) {
      setError("Both dates are required.");
      return;
    }

    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setError("Start Date cannot be after End Date.");
      return;
    }

    setError("");
    setDateRange({ startDate, endDate });
  };

  return (
    <div className="date-range-picker">
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button onClick={handleDateChange}>Apply</button>
    </div>
  );
};

export default DateRangePicker;
