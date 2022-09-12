import React, {FC} from "react";
import { Analytics } from "@mui/icons-material";
import Image from "next/image";
import { Typography } from "@mui/material";
import styles from '../styles/Home.module.css'
import CustomLoader from "./asset/CustomLoader";

interface Props {
  amount: number,
  chart: JSX.Element,
  quat: string,
  icon: JSX.Element,
  describeData: string
}

const CustomCard:FC<Props> = ({amount, chart, quat, icon, describeData}) => {

  return (
    <div className={styles['cardContainer']}>
      {
        !(amount || chart || quat) ? (<CustomLoader/>) :
        (
          <>
          <div className={styles['topContainer']}>
        {icon}
      </div>
      <div className={styles['middleContainer']}>
        <div className={styles['centralContainer']}>
          <Typography fontWeight={500} fontSize={"1rem"}>
            {describeData}
          </Typography>
          <Typography variant="h4" fontWeight={800} fontSize={"1.5rem"}>
            No: {amount}
          </Typography>
        </div>
        <div style={{width: 80, height: 80}}>
          {chart}
        </div>
      </div>
      <div className={styles['bottomContainer']}>
        <Typography sx={{ color: "#555", fontSize: "smaller" }}>
          {quat}
        </Typography>
      </div>
          </>
        )
      }
    </div>
  );
};

export default CustomCard;
