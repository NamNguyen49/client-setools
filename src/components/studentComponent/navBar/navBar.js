// import Typography from '@mui/material/Typography';
// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import SideBar from '../sideBar/sideBar';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { useNavigate } from 'react-router-dom';
// import Profile from '../../../pages/Profile';
// import { useDispatch } from 'react-redux';
// function NavBar() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const toggleDrawer = (open) => {
//     setDrawerOpen(open);
//   };
//   const dispatch = useDispatch();

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const navigate = useNavigate();

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleProfileClick = () => {
//     navigate('/profile');
//     handleClose();
//   };
//   const handleLogout = () => {

//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar sx={{ height: "3%" }}>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//             onClick={() => toggleDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               marginLeft: 'auto',
//               marginBottom: '0.3%',
//               marginRight: '5%',
//             }}
//           >
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               SE TOOL
//             </Typography>
//           </Box>
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit"
//           >
//             <AccountCircleIcon sx={{ fontSize: '30px', paddingRight: "10%" }} />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//         <SwipeableDrawer
//           anchor="left" // Chỉ định vị trí của drawer
//           open={drawerOpen}
//           onClose={() => toggleDrawer(false)}
//           onOpen={() => toggleDrawer(true)}
//         >
//           {/* Nội dung của drawer điều này có thể là nội dung bạn muốn hiển thị trong drawer */}
//           <div style={{ width: 250 }}>
//             <SideBar />
//           </div>
//         </SwipeableDrawer>
//       </AppBar>
//     </div>
//   );
// }

// export default NavBar;

import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SideBar from '../sideBar/sideBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import Profile from '../../../pages/Profile';
import { useDispatch } from 'react-redux';

function NavBar() {


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };
  const handleLogout = () => {
    navigate('/');
    handleClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ height: "3%", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              SE TOOL
            </Typography>
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon sx={{ fontSize: '30px', paddingRight: "10%" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <div style={{ width: 300 }}>
            <SideBar />
          </div>
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
}

export default NavBar;
