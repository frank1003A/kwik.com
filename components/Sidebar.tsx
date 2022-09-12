import {
  CreateRounded,
  Dashboard,
  FilePresent,
  Message,
  People,
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
          className={styles.btnCreate}
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

        <Link href={"/profile"}>
          <div
            className={
              router.pathname == "/profile"
                ? styles.outercontainerActive
                : styles.outercontainer
            }
          >
            <div className={styles.smallcontainer}>
              <Message />
            </div>
            <p>Profile</p>
            <Chip
              label={"2"}
              sx={{
                borderRadius: "4px",
                height: "30px",
                width: "30px",
                fontSize: "xx-small",
              }}
              variant="filled"
              color="error"
              size="medium"
            />
          </div>
        </Link>
      </div>

      <div className={styles.upperContainer}>
        <Button
          className={styles.btnCreate}
          innerText={"Customize"}
          onClick={() => openSModal()}
          icon={<Settings />}
        />
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
            <div className={styles["card"]} onClick={() => setOptionModal(false)}>
              <Link href="http://localhost:3000/invoice/create"
              >
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

/**<Modal OpenModal={optionModal} handleCloseModal={closeOModal} pd="">
        <div className={styles.optionContainer}>
          <Link href="/kwik_creator">
            <div className={styles.option}>
              <div className={styles["card"]}>
                <span className={styles["AddIcon"]}>
                  <AddCircle sx={{ fontSize: "150px" }} />
                </span>
                <Typography>Kwik Invoice Creator</Typography>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className={styles.option}>
              <div className={styles["card"]}>
                <span className={styles["AddIcon"]}>
                  <AddCircle sx={{ fontSize: "150px" }} />
                </span>
                <Typography>Kwik Default Template</Typography>
              </div>
            </div>
          </Link>
        </div>
      </Modal> */

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
