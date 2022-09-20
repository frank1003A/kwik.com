import {
  CreateRounded,
  Dashboard,
  FilePresent,
  Message,
  People,
  Person,
  Settings,
} from "@mui/icons-material";
import { Box, Chip, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import styles from "../styles/Home.module.css";
import Create from "./asset/Create";
import Button from "./Button";
import Modal from "./Modal";
import SettingComponent from "./Settings";

interface Props {
  id?: string;
  switchOnChangeHandler?: () => void;
}
const Sidebar = ({ id, switchOnChangeHandler }: Props) => {
  const router = useRouter();
  const [optionModal, setOptionModal] = useState<boolean>(false);
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);

  const openSModal = (): void => setSettingsModal(true);
  const closeSModal = (): void => setSettingsModal(false);

  return (
    <Box
      className={styles.sidebar}
      id={id}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      <div className={styles.upperContainer}>
        <Button
          innerText={"KWIK CREATE"}
          onClick={() => openOModal()}
          icon={<CreateRounded />}
        />
      </div>

      <div className={styles.nav}>
        <Link href={"/"}>
          <a
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
          </a>
        </Link>

        <Link href={"/invoices"}>
          <a
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
          </a>
        </Link>
        <Link href={"/clients"}>
          <a
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
          </a>
        </Link>

        <Link href={"/products"}>
          <a
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
          </a>
        </Link>

        <Link href={"/profile"}>
          <a
            className={
              router.pathname == "/profile"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Person />
            </div>
            <p>Profile</p>
          </a>
        </Link>
      </div>

      <Divider />

      <div className={styles.nav}>
        <div className={styles.sc_white} onClick={() => openSModal()}>
          <Settings />
          <p>Settings</p>
        </div>
      </div>

      {/**Create Invoice Modal */}
      <Modal OpenModal={optionModal} handleCloseModal={closeOModal} pd="">
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <Typography variant="body1" color="initial">
              New Invoice
            </Typography>
            <Divider />
            <Create />
            <div
              className={styles["card"]}
              onClick={() => setOptionModal(false)}
            >
              <Link href="https://kwik-mini-invoice-generator.vercel.app/invoice/create">
                <Typography>Create Invoice</Typography>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      {/**Settings Modal */}
      <Modal OpenModal={settingsModal} handleCloseModal={closeSModal} pd="">
        <SettingComponent switchOnchangehandler={switchOnChangeHandler} />
      </Modal>
    </Box>
  );
};

export default Sidebar;
