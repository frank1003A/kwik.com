import React, {FC} from "react";
import { Analytics } from "@mui/icons-material";
import Image from "next/image";
import { Typography } from "@mui/material";
import styles from '../styles/Home.module.css'

const CustomCard:FC = () => {
  return (
    <div className={styles['cardContainer']}>
      <div className={styles['topContainer']}>
        <Analytics />
      </div>
      <div className={styles['middleContainer']}>
        <div className={styles['centralContainer']}>
          <Typography fontWeight={500} fontSize={"1rem"}>
            Total Sales
          </Typography>
          <Typography variant="h4" fontWeight={800} fontSize={"1.5rem"}>
            NGN 25,024
          </Typography>
        </div>
        <div>
          <Image src="/70-percent.svg" width={80} height={80} />
        </div>
      </div>
      <div className={styles['bottomContainer']}>
        <Typography sx={{ color: "#555", fontSize: "smaller" }}>
          Last 24 hours
        </Typography>
      </div>
    </div>
  );
};

export default CustomCard;
