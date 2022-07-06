import React, {FC} from "react";
import CustomCard from "./CustomCard";
import UpdateCard from "./UpdateCard";
import SalesAnalytics from "./SalesAnalytics";
import styles from '../styles/Home.module.css'
import {Typography} from '@mui/material'
import Button from '../components/Button'
import Views from './Views'
import AddIcon from '@mui/icons-material/Add'

const dashboard: FC = () => {
  return (
    <div className={styles['dashboardCont']}>
      <div className={styles['topCont']}>
        <div className={styles['innerdiv']}>
        <CustomCard />
        <CustomCard />
        <CustomCard />
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
