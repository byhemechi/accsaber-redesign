"use client";
import { Line } from "react-chartjs-2";
import {
  LineElement,
  Chart,
  LinearScale,
  TimeSeriesScale,
  PointElement,
} from "chart.js";
import "chartjs-adapter-luxon";

const RankGraph: React.FC<{
  children?: never;
  history: [string, number][];
}> = ({ history }) => {
  Chart.register(LineElement, LinearScale, TimeSeriesScale, PointElement);

  return (
    <Line
      data={{
        datasets: [{ data: history, label: "rank", borderColor: "#2563eb" }],
      }}
      color={"red"}
      className={``}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            intersect: false,
            mode: "index",
          },
        },
        hover: {
          intersect: false,
          mode: "index",
        },
        scales: {
          x: {
            type: "timeseries",
          },
          y: {
            reverse: true,
            ticks: {
              precision: 0,
            },
          },
        },
        elements: {
          line: {
            fill: false,
          },
          point: {
            radius: 0,
          },
        },
      }}
    />
  );
};

export default RankGraph;
