import { CheckCircleSharp, Delete } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import * as React from 'react';
import Avatar from 'react-avatar';

import useCurrentUser from '../hooks/useCurrentUser';
import LeftAnchor from './LeftAnchor';
import { UserBadge } from './styled-component/Global';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface Props {
  bg?: string,
  userEmail: string,
  handleSignOut: () => void,
  name?: string,
}

export default function PrimarySearchAppBar({bg, userEmail, handleSignOut, name}: Props) {
  
  const { user } = useCurrentUser()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState<boolean>(false)
  const [searchModal, setSearchModal] = React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (searchModal === true) inputRef.current?.focus()
  }, [searchModal])

  const style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    background: "#000000db",
    height: "100vh",
    padding: "2rem",
    overflow: "hidden",
  };

  const handleOpenSearchModal = (
    e: React.FocusEvent<HTMLInputElement | 
    HTMLTextAreaElement, Element>) => {
   if (e.bubbles === true) {
    setSearchModal(true) 
    e.bubbles = false}
  }
  const handleCloseSearchModal = (e: React.FocusEvent<HTMLInputElement | 
    HTMLTextAreaElement, Element>) => {
      setSearchModal(false)
}
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const { theme } = useTheme()

  const handleOpenDrawer = ( ) => {
    setOpenDrawer(!openDrawer)
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar 
          name={user.fullname}
          color={mounted && theme === "dark" ?  "#FFA500" : "#2124B1"}
          round="50%"
          size="40px"
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: "fixed",
          maxHeight: "64px",
          background: mounted && theme === "dark" ? "#27272f" : "white",
          color: mounted && theme === "dark" ? "#fff" : "#2124B1",
          boxShadow: 0,
        }}  
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, 
              display: {
                xs: "flex",
                md: "none",
              },
             }}
          >
            {/**<LeftAnchor anchor={'left'} open={false} /> */}
          </IconButton>
          <Image src={"/kwik.png"} alt="Kwik Logo" width={128} height={43} />
          <Search sx={{background: "transparent"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search templates…"
              inputProps={{ "aria-label": "search" }}
              onClick={(e) => {
                setSearchModal(true);
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "center",
              alignItems: "center",
              width: 250,
            }}
          >
            <UserBadge><CheckCircleSharp fill="green"/> {userEmail}</UserBadge>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                name= {user.fullname}
                color={mounted && theme === "dark" ?  "#FFA500" : "#2124B1"}
                round="50%"
                size="40px"
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Modal 
       open={searchModal}
       onClose={handleCloseSearchModal}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >
        <motion.div style={style} layout>
          <div>
            <IconButton aria-label="" onClick={() => setSearchModal(false)}>
              <Delete/>
            </IconButton>
          </div>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search templates…"
              inputProps={{ "aria-label": "search" }}
              ref={inputRef}
            />
          </Search>
          <div>
              <p>Search For anything</p>
            </div>
        </motion.div>
      </Modal>
    </Box>
  );
}



/**

  const boxShadow: string = "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ color: '#2124B1', background: '#fff', boxShadow: 0}}>
        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Box
          sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}
          >
            <LeftAnchor anchor={'left'} open={false} />
            <Image src={'/kwik.png'} alt="Kwik Logo" width={128} height={43}/>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <ButtonComponent innerText={'Login'} icon={<Vuser/>} onClick={handleOpenUser}/>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Modal OpenModal={OpenUser} handleCloseModal={handleCloseUserModal}>
      <Login/>
      </Modal>
    </Box>
  );
} */
