import React, { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Close, CloseRounded, Menu } from "@mui/icons-material";
import styles from "../styles/LandingPage.module.css";
import { Divider } from "@mui/material";
import CustomIconBtn from "./CustomIconBtn";

type Anchor = "top" | "left" | "bottom" | "right";

interface Nav {
  href: string;
  icon: JSX.Element;
  linkName: string;
}

interface Props {
  anchor: Anchor;
  open: boolean;
  navlinks: Nav[];
  bottomElement?: ReactNode
}

const Anchor = ({ anchor, navlinks, bottomElement }: Props) => {
  const [state, setState] = useState<{ [key: string]: boolean }>({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: Props["open"]) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      {[anchor].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <Menu/>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ marginTop: 65 }}
            variant="temporary"
            classes={{paper: styles["primary_anchor"]}}
          >
              <div>
              <div className={styles["top-logo"]}>
                <img src="/kwik_logo.png" />
                <CloseRounded className={styles["close_icon"]} htmlColor="#ffa500"
                />
              </div>
              <div className={styles["slideout-bar"]}>
              {navlinks.map((nav, index) => {
                return (
                  <Link href={nav.href} key={nav.href+"_"+index.toString()}>
                    <a>
                      {nav.icon} {nav.linkName}
                    </a>
                  </Link>
                );
              })}
              </div>
              </div>
              <Divider/>
              <div className={styles["btm_sb"]}>
              {bottomElement}
              </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Anchor;
