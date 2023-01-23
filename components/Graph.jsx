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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph() {
  //options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Teachers Attendance",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [110, 20, 30, 40, 100, 60, 70, 80, 90, 100, 110, 129],
        borderColor: "#0b7a66",
        backgroundColor: "#0b7a66",
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return (
    <div className="outline outline-1 bg-white outline-[#e6e5e8] rounded-lg p-5 flex flex-col gap-5 w-full">
      <section>
        <Line options={options} data={data} />
      </section>
    </div>
  );
}

export default Graph;
