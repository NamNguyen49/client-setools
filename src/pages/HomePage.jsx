import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Pagination,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast } from "react-toastify";
import { GridSearchIcon } from "@mui/x-data-grid";
import { AiFillFacebook } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import SearchAppBar from '../components/studentComponent/navBar/navBar';
const API_ENDPOINT =


    "https://64a6238b00c3559aa9c06117.mockapi.io/manageContact";

export default function HomePage() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [searchValue, setSearchValue] = useState("");
    const [noteUser, setNoteUser] = useState("");



    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    const [value, setValue] = useState("waiting");
    const handleFilterClick = (event, newValue) => {
        setValue(newValue);
    };
    const handleDetailClick = () => {
        navigate('/student');
    };
    const navigate = useNavigate();
    const handleWaiting = (row) => {

        const updatedRow = { ...row, status: "waiting" };
        axios
            .put(`${API_ENDPOINT}/${row.id}`, updatedRow)
            .then((response) => {

                setData((prevData) =>

                    prevData.filter((item) => item.id !== row.id)
                );


                setPassedData((prevData) => [...prevData, response.data]);
                toast.success("Pass Successful");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };
    const handleReject = (row) => {
        const updatedRow = { ...row, status: "rejected" };

        axios
            .put(`${API_ENDPOINT}/${row.id}`, updatedRow)
            .then((response) => {
                setData((prevData) =>
                    prevData.filter((item) => item.id !== row.id)
                );
                setRejectedData((prevData) => [...prevData, response.data]);
                alert('Are use sure??');
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const [data, setData] = useState([]);
    const [passedData, setPassedData] = useState([]);
    const [rejectedData, setRejectedData] = useState([]);
    useEffect(() => {
        setValue("waiting");
    }, []);

    const handlePageChange = (event, page) => {
        navigate(`/home?page=${page}`);
    };
    const handlePageChange1 = () => {
        navigate(`/home?page=${1}`);
    };
    const itemsPerPage = 6;
    const page =
        Number(new URLSearchParams(window.location.search).get("page")) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginationData = data.slice(startIndex, endIndex);

    useEffect(() => {

        axios
            .get(
                `https://64a6238b00c3559aa9c06117.mockapi.io/manageContact/?status=${value}`


            )
            .then((response) => {

                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [value]);

    const handleProfileClick = () => {
        navigate('/profile');
        handleClose();
    };
    const handleLogout = () => {
        navigate('/');
        handleClose();
    };


    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1, }}>

                    <SearchAppBar />
                    <Toolbar>


                        <Grid
                            item
                            xs={6}
                            sx={{
                                maxWidth: "300px",
                                flexGrow: 0,
                                display: "flex",
                                flexDirection: "row-reverse",
                                marginLeft: "auto",
                            }}
                        >
                            <div className="search-container">
                                <TextField
                                    id="search"
                                    type="search"
                                    label="Search"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                sx={{
                                                    backgroundColor: "#inherit",
                                                    "&:hover": {
                                                        backgroundColor: "#inherit",
                                                    },
                                                    position: "absolute",
                                                    right: 0,
                                                    width: "50px",
                                                    height: "100%",
                                                    borderRadius: 0,
                                                }}
                                            >
                                                <GridSearchIcon sx={{ color: "white" }} />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </div>
                        </Grid>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >

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
                            </div>
                        )}
                    </Toolbar>

                </Box>
            </div>
            <div
                style={{
                    display: "flex ",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TabList
                                    onChange={handleFilterClick}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                        label="List Project"
                                        value="waiting"
                                    />

                                    <Tab
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                        label="Delete"
                                        value="rejected"
                                    />
                                </TabList>
                            </Grid>


                        </Grid>

                        <TabPanel value="waiting" sx={{ p: 0 }}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 450, width: "100%" }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                            >
                                                Projects
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Role
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                FullName
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Email
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginationData
                                            .filter((row) =>
                                                row.name
                                                    .toLowerCase()
                                                    .includes(searchValue.toLowerCase())
                                            )
                                            .map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {row.project}
                                                    </TableCell>
                                                    <TableCell align="center">{row.score}</TableCell>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handleDetailClick()}
                                                            >
                                                                Detail
                                                                {console.log(passedData)}
                                                            </Button>

                                                            <Button
                                                                color="error"
                                                                variant="outlined"
                                                                onClick={() => handleReject(row)}
                                                            >
                                                                Delete
                                                                {console.log(">>>>check", rejectedData)}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                {/* hiện thị số trang  */}
                                <div
                                    className="pagination"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1rem",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(data.length / 5)}
                                        showFirstButton
                                        showLastButton
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </TableContainer>
                        </TabPanel>

                        <TabPanel value="passed" sx={{ p: 0 }}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 450, width: "100%" }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                            >
                                                Full Name
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Role
                                            </TableCell>

                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Projects
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Email
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginationData
                                            .filter((row) =>
                                                row.name
                                                    .toLowerCase()
                                                    .includes(searchValue.toLowerCase())
                                            )
                                            .map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.score}</TableCell>
                                                    <TableCell align="center">{row.project}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>

                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"

                                                            >
                                                                Detail
                                                                {console.log(passedData)}
                                                            </Button>

                                                            <Button
                                                                color="error"
                                                                variant="outlined"
                                                                onClick={() => handleReject(row)}
                                                            >
                                                                Delete
                                                                {console.log(">>>>check", rejectedData)}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>

                                <div
                                    className="pagination"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1rem",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(data.length / 6)}
                                        showFirstButton
                                        showLastButton
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </TableContainer>
                        </TabPanel>
                        {/* Bang Delete  */}
                        <TabPanel value="rejected" sx={{ p: 0 }}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 450, width: "100%" }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                            >
                                                Projects
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Role
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Full Name
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Email
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginationData
                                            .filter((row) =>
                                                row.name
                                                    .toLowerCase()
                                                    .includes(searchValue.toLowerCase())
                                            )
                                            .map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {row.project}
                                                    </TableCell>
                                                    <TableCell align="center">{row.score}</TableCell>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handleWaiting(row)}
                                                            >
                                                                UnDelete
                                                                {console.log(passedData)}
                                                            </Button>


                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <div
                                    className="pagination"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1rem",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(data.length / 5)}
                                        showFirstButton
                                        showLastButton
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </TableContainer>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div
                style={{
                    height: "150px",
                    backgroundColor: "#D6DDFF",
                    marginTop: "0rem",
                }}
            >
                <Box sx={{ textAlign: "center", paddingTop: "-2rem" }}>
                    <AiFillFacebook style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />

                    <AiTwotoneMail style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />

                    <AiFillTwitterSquare style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />
                    <Typography sx={{ color: "#9CA3AF" }}>
                        Made by <span style={{ fontWeight: "bolder" }}>SE TOOL</span>
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF" }}>
                        © 2023 <span style={{ fontWeight: "bolder" }}>SWP391</span>. All rights reserved
                    </Typography>
                </Box>
            </div>
        </>
    );
}
