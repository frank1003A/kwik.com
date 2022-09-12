import React, { FC, useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import UpdateCard from "./UpdateCard";
import SalesAnalytics from "./SalesAnalytics";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";
import Button from "../components/Button";
import Views from "./Views";
import AddIcon from "@mui/icons-material/Add";
import { ChartData } from "chart.js";
import DougnutChart from "./Doughnut";
import useGetter from "../hooks/useGetter";
import { useSession } from "next-auth/react";
import {
  Analytics,
  GifBoxSharp,
  Receipt,
  VerifiedUser,
} from "@mui/icons-material";
import { Invoice } from "./Data/types";

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
            <Typography>Recent Views</Typography>
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
