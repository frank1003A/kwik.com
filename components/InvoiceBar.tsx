import React, { FC } from "react";
import styles from "../styles/Home.module.css";
import { DefaultTheme } from "styled-components";
import styled from "styled-components";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SpeedDial from "./SpeedDial";
import { NextURL } from "next/dist/server/web/next-url";
import { ObjectId } from "mongodb";
import Avatar from "react-avatar";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Clear,
  Create,
  Delete,
  DeleteSweepRounded,
  Print,
  Share,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { convertDateFormat } from "../utils/utils";
import CustomIconBtn from "./CustomIconBtn";
import { useTheme } from "next-themes";
import NumberFormat from "react-number-format";

interface Props {
  name: string;
  clientname: string;
  invtitle: string;
  amt: number | string;
  due: Date;
  editLink?: JSX.Element;
  invId?: ObjectId | string;
  status?: (JSX.Element | undefined)[];
  handleDelete: () => void;
  CurrencyText?: string
}

const InvoiceBar: FC<Props> = ({
  name,
  invtitle,
  amt,
  due,
  invId,
  status,
  handleDelete,
  CurrencyText
}) => {
  const { theme } = useTheme();

  return (
    <motion.div className={styles.invcard} layout>
      <div className={styles.top}>
        <Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography id="cn">{invtitle}</Typography>
            <Status>{status}</Status>
          </div>
          <CustomIconBtn
            icon={
              <Clear
                sx={{
                  color: "#555",
                  ":hover": {
                    color: theme === "light" ? "#2124b1" : "#FFA500",
                  },
                }}
              />
            }
            toolTip="Delete"
            handleClick={handleDelete}
          />
        </Row>
      </div>
      <div className={styles.barmain}>
        <Row>
          <div className={styles.invamt}>
            <Column>
              {/**<span>{!CurrencyText ? "NGN": CurrencyText}</span> */}
              <NumberFormat
                thousandSeparator={true}
                displayType="text"
                prefix={!CurrencyText ? "NGN": CurrencyText}
                value={amt}
              />
              <Typography id="amtlabel">Amount Total</Typography>
            </Column>
          </div>
          <div className={styles.induedate}>
            <Column>
              <span>{convertDateFormat(due.toString(), "mm/dd/yyyy")}</span>
              <Typography id="dlabel">Due Date</Typography>
            </Column>
          </div>
        </Row>
      </div>
      <div className={styles.btm}>
        <Row>
          <span id="dlabel">{name}</span>
          <ButtonContainer>
            <span>
              <Link
                href={{
                  pathname: "http://localhost:3000/invoice/update",
                  query: { invoice_id: invId?.toString() },
                }}
              >
                <Tooltip title="Update">
                  <Create />
                </Tooltip>
              </Link>
            </span>
            <span>
              <Tooltip title="Share">
                <Share />
              </Tooltip>
            </span>
          </ButtonContainer>
        </Row>
      </div>
    </motion.div>
  );
};

export default InvoiceBar;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  #chipFont {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 0.8rem;
    color: #fff !important;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  /**span {
        margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: rgb(0 0 0 / 54%);
    line-height: 1.5;
    letter-spacing: 0.00938em;
    }  */

  #cn {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    color: #222baa;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  #amtlabel,
  #dlabel {
    display: flex;
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    color: rgb(0 0 0 / 54%);
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  justify-items: start;

  span {
    padding: 4px;
    color: rgb(0 0 0 / 54%);
    cursor: pointer;
    font-size: 0.1rem;
  }

  span:hover {
    color: #2124b1;
  }
`;

const Status = styled.div`
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #fff !important;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

/**router.push('http://localhost:3000/invoice/update' as 'sfsfsggf', {
            query: {invoice_id: invId?.toString()} */
