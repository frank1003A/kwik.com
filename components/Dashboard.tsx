import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { ChartData } from 'chart.js';
import React, { FC, useEffect, useState } from 'react';

import Button from '../components/Button';
import styles from '../styles/Home.module.css';
import CustomCard from './CustomCard';
import DougnutChart from './Doughnut';
import SalesAnalytics from './SalesAnalytics';
import UpdateCard from './UpdateCard';
import Views from './Views';

interface Analytics {
  id: number;
  itemNumber: number;
  quater: string;
  icon: JSX.Element;
  describeData: string;
}

interface salesANaliytics {
  icon: JSX.Element,
  mainText: string,
  btmText: string,
  sales: number,
  percentGD: string
}

interface Props {
  chartdata: ChartData<"doughnut", number[], string>;
  dataa: Analytics[];
  bardata: ChartData<"bar", number[], string>;
  salesdata: salesANaliytics[]
}

const dashboard: FC<Props> = ({
  chartdata,
  dataa,
  bardata,
  salesdata
}) => {
  return (
    <div className={styles["dashboardCont"]}>
      <div className={styles["topCont"]}>
        <div className={styles["innerdiv"]}>
          {dataa.map((dta) => {
            return (
              <CustomCard
                key={dta.id}
                icon={dta.icon}
                describeData={dta.describeData}
                amount={dta.itemNumber}
                quat={dta.quater}
                chart={<DougnutChart data={chartdata} />}
              />
            );
          })}
          <div>
            <div className={styles["dheader"]}>
              <Typography>Recent Updates</Typography>
            </div>
            <div className={styles["ucStack"]}>
              <UpdateCard />
              <UpdateCard />
              <UpdateCard />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["btmCont"]}>
        <div className={styles["tableStack"]}>
          <div className={styles["dheader"]}>
            <Typography>Invoice Sales Chart</Typography>
          </div>
          <div className={styles["tablecont"]}>
            <Views data={bardata} />
          </div>
        </div>
        <div className={styles["salesAnalytics"]}>
          <div className={styles["dheader"]}>
            <Typography>Sales Analytics</Typography>
          </div>
          {salesdata.map(dta => {
            return (
              <SalesAnalytics
              key={dta.mainText}
              icon={dta.icon}
              btmText={dta.btmText}
              mainText={dta.mainText}
              percentGD={dta.percentGD}
              sales={dta.sales}
              />
            )
          })}
          <Button
            innerText="Add Product"
            className={styles["addpcont"]}
            icon={<AddIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
