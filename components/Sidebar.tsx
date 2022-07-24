import React, { useState, FC } from "react";
import styles from "../styles/Home.module.css";
import {
  Dashboard,
  PanoramaPhotosphereRounded,
  FilePresent,
  Handshake,
  FileOpen,
  CreateRounded,
  AddCircle,
  Message,
  Settings,
  People
} from "@mui/icons-material";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";
import { Badge, Box } from "@mui/material";
import Modal from "./Modal";
import Image from "next/image";
import { Typography } from "@mui/material";
import SpeedDial from './SpeedDial'

interface Props {
  id?: string
}
const Sidebar = ({id}: Props) => {
  const router = useRouter()
  const [optionModal, setOptionModal] = useState<boolean>(false);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);
  
  return (
    <Box
      className={styles.sidebar}
      id={id}
      sx={{ display: { xs: "none", md: "flex" } }}
    >

      <div className={styles.nav}>
        <Link href={"/"}>
          <div
            className={
              router.pathname == "/"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Dashboard />
            </div>
            <p>Dashboard</p>
          </div>
        </Link>

        <Link href={"/invoices"}>
          <div
            className={
              router.pathname == "/invoices"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <FilePresent />
            </div>
            <p>Invoices</p>
          </div>
        </Link>
        <Link href={"/clients"}>
          <div
            className={
              router.pathname == "/clients"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <People />
            </div>
            <p>Clients</p>
          </div>
        </Link>

        <Link href={"/products"}>
          <div
            className={
              router.pathname == "/products"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <FilePresent />
            </div>
            <p>Products</p>
          </div>
        </Link>

        <Link href={"/messages"}>
          <div
            className={
              router.pathname == "/messages"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Message />
            </div>
            <p>Messages</p>
            <Box><Badge badgeContent={'new'} color="error"/></Box>
          </div>
        </Link>
      </div>

      {/**Modal */}
      <Modal OpenModal={optionModal} handleCloseModal={closeOModal}>
        <div className={styles.optionContainer}>
        <Link href="/kwik_creator">
          <div className={styles.option}>
            <div  className={styles['card']}>
            <span className={styles['AddIcon']}>
            <AddCircle sx={{fontSize: '150px'}}/>
            </span>
            <Typography>
                Kwik Invoice Creator
            </Typography>
            </div>
          </div>
          </Link>
        <Link href="#">
        <div className={styles.option}>
          <div  className={styles['card']}>
            <span className={styles['AddIcon']}>
            <AddCircle sx={{fontSize: '150px'}}/>
            </span>
            <Typography>Kwik Default Template</Typography>
          </div>
        </div>
        </Link>
        </div>
      </Modal>
    </Box>
  );
};

export default Sidebar;


/**
<div className={styles.sd}>
<SpeedDial/>
</div> */

/**<Link href={"/settings"}>
          <div
            className={
              router.pathname == "/settings"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Settings />
            </div>
            <p>Settings</p>
          </div>
        </Link> */

        /** <div className={styles.upperContainer}>
        <Button
          className={styles.btnCreate}
          innerText={"KWIK CREATE"}
          onClick={() => openOModal()}
          icon={<CreateRounded />}
        />
      </div> */