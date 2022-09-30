import * as React from "react";
import Box from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Avatar from "react-avatar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Modal from "./Modal";
import SettingsComponent from "./Settings"
import { signOut } from "next-auth/react";

interface Props {
  name: string;
}
export default function AccountMenu({ name }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [settingsModal, setSettingsModal] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSModal = (): void => setSettingsModal(true);
  const closeSModal = (): void => setSettingsModal(false);

  const { theme } = useTheme();

  const { push, isReady } = useRouter()

  React.useEffect(() => {
    setMounted(true)
  },[])
  return (
    <React.Fragment>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              name={name}
              color={mounted && theme === "dark" ? "#FFA500" : "#2124B1"}
              round="50%"
              size="40px"
            />
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            gap: 5,
            "& .MuiMuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() =>  push("/profile")}>
          <MuiAvatar sx={{mr: 1}}/> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => openSModal()}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {/**Settings Modal */}
      <Modal OpenModal={settingsModal} handleCloseModal={closeSModal} pd="">
        <SettingsComponent/>
      </Modal>
    </React.Fragment>
  );
}
