import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Modalpopup from './Modalpopup';
import './ProjectButton.css'
export default function ProjectButton() {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [projects, setProjects] = useState([]); // State to store project data

    useEffect(() => {
        // Gọi API khi thành phần được tạo
        axios.get('https://64a6238b00c3559aa9c06117.mockapi.io/Student')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // [] để đảm bảo nó chỉ gọi API khi thành phần được tạo

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                ref={anchorRef}
                aria-label="project button"
                onClick={handleToggle}
            >
                Project <ArrowDropDownIcon />
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                    {projects.slice(0, 2).map((project) => (
                                        <MenuItem key={project.id}>
                                            {project.name}
                                        </MenuItem>
                                    ))}
                                    <MenuItem>
                                        <Modalpopup projects={projects} />
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
