import React, { useState, FC } from "react";
import styles from "../styles/Home.module.css";
import {
  Dashboard,
  PanoramaPhotosphereRounded,
  FilePresent,
  Handshake,
  FileOpen,
  CreateRounded,
  AddCircle
} from "@mui/icons-material";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Modal from "./Modal";
import Image from "next/image";
import { Typography } from "@mui/material";

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
      <div className={styles.upperContainer}>
        <Button
          className={styles.btnOutlined}
          innerText={"KWIK CREATE"}
          onClick={() => openOModal()}
          icon={<CreateRounded />}
        />
      </div>

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

        <Link href={"/contests"}>
          <div
            className={
              router.pathname == "/contest"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Handshake />
            </div>
            <p>Contests</p>
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

        <Link href={"/quotations"}>
          <div
            className={
              router.pathname == "/quotations"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <PanoramaPhotosphereRounded />
            </div>
            <p>Quotations</p>
          </div>
        </Link>

        <Link href={"/resume"}>
          <div
            className={
              router.pathname == "/resume"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <FileOpen />
            </div>
            <p>Resume</p>
          </div>
        </Link>
      </div>
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
