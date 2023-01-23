import React from "react";
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ teachers, students }) {
  const data = {
    labels: ["Students", "Teachers", "Activities"],
    datasets: [
      {
        label: "#",
        data: [students, teachers, 43],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="outline outline-1 bg-white outline-[#e6e5e8] rounded-lg p-5 flex flex-col gap-5 w-full">
      <section>
        <Doughnut data={data} />
      </section>
    </div>
  );
}

export default DoughnutChart;
