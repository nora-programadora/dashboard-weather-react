//1
// import React, { useState } from "react";

// const DateRangePicker = ({ setDateRange }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleDateChange = () => {
//     if (startDate && endDate) {
//       setDateRange({ startDate, endDate });
//     }
//   };

//   return (
//     <div className="date-range-picker">
//       <label>
//         Start Date:
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </label>
//       <label>
//         End Date:
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </label>
//       <button onClick={handleDateChange}>Apply</button>
//     </div>
//   );
// };

// export default DateRangePicker;

//2

// import React, { useState } from "react";

// const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
//   const handleDateChange = () => {
//     if (startDate && endDate) {
//       if (startDate && endDate) {
//         setDateRange({ startDate, endDate });
//       }
//     }
//   };

//   return (
//     <div className="date-range-picker">
//       <label>
//         Start Date:
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </label>
//       <label>
//         End Date:
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </label>
//       <button onClick={handleDateChange}>Apply</button>
//     </div>
//   );
// };

// export default DateRangePicker;

//3

import React from "react";

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDateRange,
}) => {
  const handleDateChange = () => {
    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
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
      <button onClick={handleDateChange}>Apply</button>
    </div>
  );
};

export default DateRangePicker;
