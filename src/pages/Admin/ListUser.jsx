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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import Pagination from "@mui/material/Pagination";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast } from "react-toastify";
import { GridSearchIcon } from "@mui/x-data-grid";
import { AiFillFacebook } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";

const API_ENDPOINT =
  // "http://10.88.55.108:9305/api/reccer/personal/getAll";

  "https://64a6238b00c3559aa9c06117.mockapi.io/manageContact";

export default function ListUser() {
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
    navigate(`/admin?page=${page}`);
  };
  const handlePageChange1 = () => {
    navigate(`/admin?page=${1}`);
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
        `https://64a6238b00c3559aa9c06117.mockapi.io/manageContact/?status=${value}`

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
      <div>
        <Box sx={{ flexGrow: 1, }}>

          <AppBar position="static"
          >
            <Toolbar>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={auth}
                      onChange={handleChange}
                      aria-label="login switch"

                    />

                  }
                  label={auth ? 'Logout' : 'Login'}
                />
              </FormGroup>
              <IconButton
                size="large"
                edge="start"
                color="inherrit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                SE TOOL
              </Typography>
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
                    <AccountCircle />
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
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
                    label="List User"
                    value="waiting"
                  />
                  {/* <Tab
                    onClick={handlePageChange1}
                    style={{
                      fontWeight: "bold",
                    }}
                    label="Detail"
                    value="passed"
                  /> */}
                  <Tab
                    style={{
                      fontWeight: "bold",
                    }}
                    label="Ban"
                    value="rejected"
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
                        Responsible
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
                          <TableCell align="center">{row.job}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup sx={{ gap: "10px" }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handlePass(row)}
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
                    count={Math.ceil(data.length / 5)}
                    showFirstButton
                    showLastButton
                    onChange={handlePageChange}
                  />
                </div>
              </TableContainer>
            </TabPanel>
            Bang Detal
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
                        Responsible
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
                          <TableCell align="center">{row.job}</TableCell>
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
            {/* Bang Ban  */}
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
                        Responsible
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
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.job}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup sx={{ gap: "10px" }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handlePass(row)}
                              >
                                Unban
                                {console.log(passedData)}
                              </Button>

                              {/* <Button
                                color="error"
                                variant="outlined"
                                onClick={() => handleReject(row)}
                              >
                                Ban
                                {console.log(">>>>check", rejectedData)}
                              </Button> */}
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
      {/* <PopUpNote open={openPopup} onClose={closePopup} note={noteUser} /> */}
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
