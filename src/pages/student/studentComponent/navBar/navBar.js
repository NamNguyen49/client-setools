import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SideBar from '../sideBar/sideBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{height:"3%"}}>
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
          <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: 'auto', marginBottom: '0.3 %', marginRight:'5%' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search" variant="standard"  sx={{width:'250px'}}/>
          </Box>

          <Box>
            <AccountCircleIcon sx={{ fontSize: '30px', paddingRight: "10%" }} />
          </Box>

        </Toolbar>

        <SwipeableDrawer
          anchor="left" // Chỉ định vị trí của drawer
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          {/* Nội dung của drawer điều này có thể là nội dung bạn muốn hiển thị trong drawer */}
          <div style={{ width: 250 }}>
            <SideBar />
          </div>
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
}

export default NavBar;
