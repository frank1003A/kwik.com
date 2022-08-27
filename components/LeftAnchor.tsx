import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import  { 
  ArrowRightAlt, 
  InboxOutlined, 
  Mail, 
  Menu,
  Dashboard,
  PanoramaPhotosphereRounded,
  FilePresent,
  Handshake,
  FileOpen,
  CreateRounded,
  AddCircle,
  Message,
  Settings,
  People,
} from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Chip from '@mui/material/Chip';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    anchor: Anchor,
    open: boolean
}

export default function TemporaryDrawer({anchor, open}:Props) {
  const router = useRouter();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: Props["open"]) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <ArrowRightAlt/> : <Mail/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <ArrowRightAlt/> : <Mail/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
           onClick={toggleDrawer(anchor, true)}><Menu /></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{marginTop: 65}}
          >
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

/**<div className={styles.nav}>
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
            onClick={() => router.push("/products")}
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
      </div> */
