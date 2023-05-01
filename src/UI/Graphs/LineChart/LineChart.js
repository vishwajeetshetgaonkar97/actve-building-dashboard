import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                borderColor: ' #F7F5E099',
              },
              ticks: {
                font: {
                  size: 8,
                },
              },
            },
            y: {
              grid: {
                display: false,
                borderColor: ' #F7F5E099',
              },
              ticks: {
                font: {
                  size: 8,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
