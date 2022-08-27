import React, { FC } from "react";
import { Typography } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
import styles from "../styles/Home.module.css";

const SalesAnalytics: FC = () => {
  const swatch = {
    display: "flex",
    fontSize: "x-small",
    color: "white",
    justifyContent: "center",
    width: "max-content",
    padding: ".5rem",
    borderRadius: "50%",
    background: "#2124B1",
    alignItems: "center",
  };
  return (
    <>
      <div className={styles["salesana"]}>
        <div style={swatch}>
          <ShoppingCartRounded />
        </div>
        <div className={styles["salesdesc"]}>
          <Typography>ONLINE ORDERS</Typography>
          <span>Last 24 Hours</span>
        </div>
        <div className={styles["salesper"]}>
          <Typography>+24%</Typography>
        </div>
        <div className={styles["salesamt"]}>
          <Typography>1100</Typography>
        </div>
      </div>
    </>
  );
};

export default SalesAnalytics;
