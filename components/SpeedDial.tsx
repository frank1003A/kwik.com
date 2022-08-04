import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import styles from "../styles/Home.module.css";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { ImportExport, Create } from "@mui/icons-material"
import { NextURL } from "next/dist/server/web/next-url";
import Link from "next/link";
import { ObjectId } from "mongodb";

interface Props {
  handleExport?: () => void,
  handleCreate?: () => void,
  handlePrint?: () => void,
  handleShare?: () => void,
  id?: ObjectId | string,
  handleClick?: (e: MouseEvent,id: string) => void
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  justify-items: start;

  span {
    padding: 4px;
    color: #555;
    cursor: pointer;
    font-size: .1rem;
  }

  span:hover {
    color: #2124b1;
  }
`;

//box-shadow: 0 0 10px rgb(0 0 0 / 15%);

export default function BasicSpeedDial(
  {handleCreate,handleShare, handleExport, handlePrint, id, handleClick}:Props) 
  {

  const actions = [
    { icon: <ImportExport />, name: "Export", handler: handleExport },
    { icon: <Create />, name: "Edit", handler: handleCreate },
    { icon: <PrintIcon />, name: "Print", handler: handlePrint },
    { icon: <ShareIcon />, name: "Share", handler: handleShare },
  ];

  return (
    <Container>
      {actions.map((action, idx) => (
        <span key={idx}>
            <Tooltip title={action.name} onClick={() => action.handler}>{action.icon}</Tooltip>
        </span>
      ))}
    </Container>
  );
}

/** <Link href={`http://localhost:3000/invoice/update}`}>
            <Tooltip title={action.name}>{action.icon}</Tooltip>
          </Link> */
//http://localhost:3000/invoice/${id?.toString()
/**<Box sx={{ transform: 'translateZ(0px)', flexGrow: 1}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16}}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
          sx={{borderRadius: "4px"}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box> */
