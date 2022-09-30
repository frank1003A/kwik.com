import React from "react";
import Create from "./asset/Create";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css"

interface Props {
    icon: JSX.Element;
    btmText: string;
    loader?: JSX.Element
}

const CustomIconAlert = ({icon, btmText, loader}: Props) => {
  return (
    <div className={styles["custom_icon_alert"]}>
      <span>
      {icon}
      </span>
      <Typography variant="body1" color="initial">
        {btmText}
      </Typography>
      {loader ? loader : null}
    </div>
  );
};

export default CustomIconAlert;
