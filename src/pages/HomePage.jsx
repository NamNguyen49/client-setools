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
import Search from "@mui/icons-material/Search";
import SearchAppBar from '../components/studentComponent/navBar/navBar';

// import Pagination from "@mui/material/Pagination";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast } from "react-toastify";
import { GridSearchIcon } from "@mui/x-data-grid";

import Footer from "../components/Footer/Footer";

const API_ENDPOINT =
    // "http://10.88.55.108:9305/api/reccer/personal/getAll";

    "https://6530932a6c756603295ec7c4.mockapi.io/teacher";

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

    //(waiting, pass,reject)
    const [value, setValue] = useState("waiting");
    const handleFilterClick = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate();
    const handlePass = (row) => {
        // Thực hiện chuyển ứng viên từ "waiting" sang "passed" và gọi API PUT để cập nhật trạng thái
        const updatedRow = { ...row, status: "passed" };
        axios
            .put(`${API_ENDPOINT}/${row.id}`, updatedRow)
            .then((response) => {
                // Cập nhật lại dữ liệu trên client-side
                setData((prevData) =>
                    // prevData.map((item) => (item.id === row.id ? response.data : item))
                    //fake API
                    prevData.filter((item) => item.id !== row.id)
                );

                // Chuyển dòng dữ liệu từ "data" sang "passedData"
                setPassedData((prevData) => [...prevData, response.data]);
                toast.success("Pass Successful");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };
    const handleReject = (row) => {
        // Thực hiện chuyển ứng viên từ "waiting" sang "rejected" và gọi API PUT để cập nhật trạng thái
        const updatedRow = { ...row, status: "rejected" };

        axios
            .put(`${API_ENDPOINT}/${row.id}`, updatedRow)
            .then((response) => {
                // Cập nhật lại dữ liệu trên client-side
                setData((prevData) =>
                    // prevData.map((item) => (item.id === row.id ? response.data : item))
                    //fake API
                    prevData.filter((item) => item.id !== row.id)
                );
                // Chuyển dòng dữ liệu từ "data" sang "rejectedData"
                setRejectedData((prevData) => [...prevData, response.data]);
                toast.error("Reject Successful");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const [data, setData] = useState([]);
    const [passedData, setPassedData] = useState([]);
    const [rejectedData, setRejectedData] = useState([]);
    useEffect(() => {
        // Đảm bảo giá trị ban đầu của "value" là "one"
        setValue("waiting");
    }, []);

    // Phân trang
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
    //Call API

    useEffect(() => {
        // Fetch contact data from the mock API
        axios
            .get(
                `https://6530932a6c756603295ec7c4.mockapi.io/teacher/?status=${value}`

                // `http://10.88.55.108:9305/api/reccer/personal/getAll`
            )
            .then((response) => {
                // setData(response.data.responseEntity.body.content);
                // console.log('>>check api',data)
                //fake api
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [value]);

    return (
        <>

            <SearchAppBar />

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
                                        onClick={handlePageChange1}
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                        label="Projects list"
                                        value="passed"

                                    />


                                </TabList>
                            </Grid>

                            {/* Search */}
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    maxWidth: "300px",
                                    flexGrow: 0,
                                    display: "flex",
                                    flexDirection: "row-reverse",
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
                                                        backgroundColor: "#626AD1",
                                                        "&:hover": {
                                                            backgroundColor: "#626AD1",
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
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Note
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
                                                    <TableCell align="center">{row.role}</TableCell>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" color="primary" align="center">
                                                            {row.note}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handlePass(row)}
                                                            >
                                                                Graded
                                                                {console.log(passedData)}
                                                            </Button>
                                                            <Button
                                                                color="error"
                                                                variant="outlined"
                                                                onClick={() => handleReject(row)}
                                                            >
                                                                Ban
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
                        {/* Bang Detail */}
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
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Note
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
                                                    <TableCell align="center">{row.role}</TableCell>
                                                    <TableCell align="center">{row.project}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" color="primary" align="center">
                                                            {row.note}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                            // onClick={() => handlePass(row)}
                                                            >
                                                                Detail
                                                                {console.log(passedData)}
                                                            </Button>

                                                            <Button
                                                                color="error"
                                                                variant="outlined"
                                                                onClick={() => handleReject(row)}
                                                            >
                                                                Ban
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
                                        count={Math.ceil(data.length / 6)}
                                        showFirstButton
                                        showLastButton
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </TableContainer>
                        </TabPanel>
                        {/* Bang Rejected  */}
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
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Project
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Gmail
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontWeight: "bolder", fontSize: "1rem" }}
                                                align="center"
                                            >
                                                Note
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
                                                    <TableCell align="center">{row.role}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.project}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" color="primary" align="center">
                                                            {row.note}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup sx={{ gap: "10px" }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handlePass(row)}
                                                            >
                                                                Unban

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
                    </TabContext>
                </Box>
            </div>

            <Footer />
        </>
    );
} 