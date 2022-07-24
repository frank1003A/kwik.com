import Chip from "@mui/material/Chip";
import { ChartData } from "chart.js";
import React, { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import BarChart from "./BarChart"
import DoughnutChart from "./Doughnut"

interface view {
  invoice: number,
  type: string,
  month: string,
  finalAmount: number,
  status: string
}

const Views: FC = () => {
  const views: view[] = [
    {
      invoice: 1,
      type: "Invoice",
      month: "January",
      finalAmount: 200000,
      status: "complete",
    },
    {
      invoice: 2,
      type: "Quotaion",
      month: "February",
      finalAmount: 450000,
      status: "Incomplete",
    },
    {
      invoice: 3,
      type: "Invoice",
      month: "March",
      finalAmount: 500000,
      status: "complete",
    },
    {
      invoice: 4,
      type: "Invoice",
      month: "April",
      finalAmount: 400000,
      status: "processing",
    },
    {
      invoice: 5,
      type: "Invoice",
      month: "May",
      finalAmount: 600000,
      status: "complete",
    },
    {
      invoice: 6,
      type: "Invoice",
      month: "June",
      finalAmount: 600000,
      status: "complete",
    },
  ];
  const [data, setData] = useState<ChartData<"bar", number[], string>>({
    labels: views.map((dta) => dta.month),
    datasets: [{
      label: "Amount-gained",
      data: views.map((dta) => dta.finalAmount),
      backgroundColor: ["#2124b1"],
      barThickness: 35,
      borderRadius: 8,
      borderColor: 'none',
      categoryPercentage: 5
    }],
  })

  const statusChip = (currentStatus: string) => {
    if (currentStatus === "complete")
      return <Chip variant="outlined" color="success" label="complete" />;
    if (currentStatus === "Incomplete")
      return <Chip variant="outlined" color="error" label="Incomplete" />;
  };
  return (
    <div>
      <div className={styles.table}>
        <BarChart data={data} 
        options={{
          plugins: {
            legend: {
              display: false //This will do the task
           }
          }
        }}
        />
      </div>
    </div>
  );
};

export default Views;
