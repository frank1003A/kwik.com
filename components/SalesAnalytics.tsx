import React, { FC } from "react";
import { Typography } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
import styles from "../styles/Home.module.css";

interface Props {
  icon: JSX.Element,
  mainText: string,
  btmText: string,
  sales: number,
  percentGD: string
}

const SalesAnalytics: FC<Props> = ({icon, mainText, btmText, sales, percentGD }) => {
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
          {icon}
        </div>
        <div className={styles["salesdesc"]}>
          <Typography>{mainText.toUpperCase()}</Typography>
          <span>{btmText}</span>
        </div>
        <div className={styles["salesper"]}>
          <Typography>{percentGD}</Typography>
        </div>
        <div className={styles["salesamt"]}>
          <Typography>{sales}</Typography>
        </div>
      </div>
    </>
  );
};

export default SalesAnalytics;
