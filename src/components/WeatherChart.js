import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ hourlyData }) => {
  const labels = hourlyData.map((hour) =>
    dayjs.unix(hour.dt).format("ddd h a")
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Degrees",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        data: hourlyData.map((hour) => hour.temp),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Temp for Next 2 days",
        align: "center",
        padding: {
          top: 5,
          bottom: 15,
        },
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Rubik', 'sans-serif'",
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "°C",
          font: {
            family: "'Rubik', 'sans-serif'",
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            family: "'Rubik', 'sans-serif'",
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <section className="chart card">
      <Line data={data} options={options} />
    </section>
  );
};

export default WeatherChart;
