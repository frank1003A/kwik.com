import React, { FC } from "react";
import styles from "../styles/Home.module.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import ButtonComponent from "./Button";

const Views: FC = () => {
  const views = [
    {
      invoice: 1,
      type: "Invoice",
      finalAmount: "200,000",
      status: "complete",
    },
    {
      invoice: 2,
      type: "Quotaion",
      finalAmount: "200,000",
      status: "Incomplete",
    },
    {
      invoice: 3,
      type: "Invoice",
      finalAmount: "200,000",
      status: "complete",
    },
  ];

  const statusChip = (currentStatus: string) => {
    if (currentStatus === "complete")
      return <Chip variant="outlined" color="success" label="complete" />;
    if (currentStatus === "Incomplete")
      return <Chip variant="outlined" color="error" label="Incomplete" />;
  };
  return (
    <div>
      <TableContainer component={Paper} className={styles.table}>
        <Table
          sx={{ minWidth: 650, border: "transparent", borderRadius: "0" }}
          aria-label="simple table"
          id="tablegen"
        >
          <TableHead
            sx={{ background: "white", textAlign: "center", color: "black" }}
          >
            <TableRow sx={{ color: "black", textAlign: "center" }}>
              <TableCell align="center">Invoice</TableCell>
              <TableCell align="center">Invoice Type</TableCell>
              <TableCell align="center">Total NGN</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {views.map((v, i) => {
              return (
                <TableRow
                  key={v.invoice}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{v.invoice}</TableCell>
                  <TableCell align="center">{v.type}</TableCell>
                  <TableCell align="center">{v.finalAmount}</TableCell>
                  <TableCell align="center">{statusChip(v.status)}</TableCell>
                  <TableCell align="center">
                    <ButtonComponent
                      innerText="Detail"
                      //className={styles['btnOutlined']}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Views;
