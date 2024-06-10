import React from "react";
import dayjs from "dayjs";

const FilterForm = ({ filters, setFilters, applyFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      filters.startDate &&
      filters.endDate &&
      dayjs(filters.startDate).isAfter(dayjs(filters.endDate))
    ) {
      alert("Start Date cannot be after End Date");
      return;
    }
    if (
      filters.minTemp &&
      filters.maxTemp &&
      parseFloat(filters.minTemp) > parseFloat(filters.maxTemp)
    ) {
      alert("Min Temperature cannot be greater than Max Temperature");
      return;
    }
    applyFilters();
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="row">
        <label>
          Start Date:
          <input type="date" name="startDate" onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" onChange={handleInputChange} />
        </label>
      </div>
      <div className="row">
        <label>
          Min Temperature (°C):
          <input type="number" name="minTemp" onChange={handleInputChange} />
        </label>
        <label>
          Max Temperature (°C):
          <input type="number" name="maxTemp" onChange={handleInputChange} />
        </label>
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
