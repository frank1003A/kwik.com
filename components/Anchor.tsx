import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Close, Menu } from "@mui/icons-material";
import styles from "../styles/LandingPage.module.css";

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
}

const Anchor = ({ anchor, open, navlinks }: Props) => {
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
            <Menu />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ marginTop: 65 }}
          >
            <motion.span
              layout
              transition={{ bounce: 20 }}
              className={styles["slideout-bar"]}
            >
              <div className={styles["top-logo"]}>
                <img src="/kwik_logo.png" />
                <Close htmlColor="#ffa500"/>
              </div>
              {navlinks.map((nav, index) => {
                return (
                  <Link href={nav.href} key={nav.href+"_"+index.toString()}>
                    <a>
                      {nav.icon} {nav.linkName}
                    </a>
                  </Link>
                );
              })}
            </motion.span>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Anchor;
