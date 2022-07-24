import React, { FC } from "react";
import styles from "../styles/Home.module.css";
import { DefaultTheme } from "styled-components";
import styled from "styled-components";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SpeedDial from "./SpeedDial";
import { NextURL } from "next/dist/server/web/next-url";
import { ObjectId } from "mongodb";

interface Props {
  name: string;
  clientname: string;
  invtitle: string;
  amt: number | string;
  due: string;
  editLink?: JSX.Element,
  invId?: ObjectId
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

     span {
        margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    } 
    #cn {
        margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: .9rem;
    color: #222baa;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    }
  `;
const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    #amtlabel, #dlabel {
        display: flex;
    margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: .9rem;
    color: #555;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    }
  `;

const InvoiceBar: FC<Props> = ({ name, clientname, invtitle, amt, due, editLink, invId }) => {

  return (
    <div className={styles.invcard}>
      <div className={styles.top}>
        <Row>
          <Typography>{name}</Typography>
          <MoreHorizIcon fill='#2124b1' />
        </Row>
      </div>
      <div className={styles.barmain}>
        <div className={styles.invtitle}>{invtitle}</div>
        <Row>
          <div className={styles.invamt}>
            <Column>
              <span>{amt}</span>
              <Typography id="amtlabel">Amount</Typography>
            </Column>
          </div>
          <div className={styles.induedate}>
            <Column>
              <span>{due}</span>
              <Typography id="dlabel">Due Date</Typography>
            </Column>
          </div>
        </Row>
      </div>
      <div className={styles.btm}>
        <Row>
          <Typography id="cn">{clientname}</Typography>
          <SpeedDial handleCreate={editLink} id={invId}/>
        </Row>
      </div>
    </div>
  );
};

export default InvoiceBar;
