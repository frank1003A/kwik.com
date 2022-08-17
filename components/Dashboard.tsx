import React, {FC, useState} from "react";
import CustomCard from "./CustomCard";
import UpdateCard from "./UpdateCard";
import SalesAnalytics from "./SalesAnalytics";
import styles from '../styles/Home.module.css'
import {Typography} from '@mui/material'
import Button from '../components/Button'
import Views from './Views'
import AddIcon from '@mui/icons-material/Add'
import { ChartData } from "chart.js";
import DougnutChart from "./Doughnut";

interface Analytics {
  id: number,
  sales: number
  quater: string
}

const dashboard: FC = () => {
  const dataa: Analytics[] = [
    {
      id: 1,
      sales: 2524,
      quater: "Quater 1",
    },
    {
      id: 2,
      sales: 100024,
      quater: "Quater 2",
    },
    {
      id: 3,
      sales: 85243,
      quater: "Quater 3",
    }
  ]

  const [data, setData] = useState<ChartData<"doughnut", number[], string>>({
    labels: dataa.map((dta) => dta.quater),
    datasets: [{
      label: "Amount-gained",
      data: dataa.map((dta) => dta.sales),
      backgroundColor: ["#2124b1", "orange"],
    }]
  })
  return (
    <div className={styles['dashboardCont']}>
      <div className={styles['topCont']}>

        <div className={styles['innerdiv']}>
        {dataa.map(dta => {
          return (
            <CustomCard amount={dta.sales} quat={dta.quater}  
            chart={
            <DougnutChart 
            data={data}
            />
          }/>
          )
        })}
        <div>

        <div className={styles['dheader']}><Typography>Recent Updates</Typography></div>
        <div className={styles['ucStack']}>
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        </div>
        </div>
        </div>
      </div>
      <div className={styles['btmCont']}>
      <div className={styles['tableStack']}>
      <div className={styles['dheader']}><Typography>Recent Views</Typography></div>
        <div className={styles["tablecont"]}>
        <Views/>
        </div>
        </div>
        <div className={styles['salesAnalytics']}>
        <div className={styles['dheader']}><Typography>Sales Analytics</Typography></div>
          <SalesAnalytics/>
          <SalesAnalytics/>
          <SalesAnalytics/>
          <Button 
    innerText="Add Product"
    className={styles['addpcont']}
    icon={<AddIcon/>}
    />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
