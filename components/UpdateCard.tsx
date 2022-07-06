import React, {FC} from "react";
import { Typography } from "@mui/material";
import styles from "../styles/Home.module.css";
import MessageIcon from '@mui/icons-material/MessageRounded'

const UpdateCard:FC = () => {
  return (
    <div className={styles["ucContainer"]}>
      <div className={styles["ucswatchCircle"]}>
        <MessageIcon/>
      </div>
      <div className={styles["ucinfo"]}>
        <Typography>
          <strong>Mike Tyson</strong> Lorem, ipsum <br/>dolor sit amet consectetur
          adipisicing elit.
        </Typography>
      </div>
    </div>
  );
};
export default UpdateCard;
