import {
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";


import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { getListBanUser, putUnBanUser } from "../../../Redux/Admin/userSlice";
import PopupBanDetails from "../PopupAdmin/PopupBanReason";
import PopupUnban from "../PopupAdmin/PopupUnBanUser";
import PopupUnbanSuccess from "../PopupAdmin/PopupUnbanSuccess";
function createData(id, fullName, email, phone, status) {
    return { id, fullName, email, phone, status };
}

const URL = "https://64783a97362560649a2d5a27.mockapi.io/api";

const ListBanUser = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const rowsPerPage = 5;
    const [openPopupUnban, setOpenPopupUnban] = useState(false);
    const [openPopupUnbanSuccess, setOpenPopupUnbanSuccess] = useState(false);
    const [filterUsers, setFilterUsers] = useState([]);
    const [userID, setUserID] = useState([]);
    const [fullName, setFullName] = useState([]);
    const dispatch = useDispatch();
    const [openPopupDetails, setOpenPopupDetails] = useState(false);
    const [banReason, setBanReason] = useState("");

    const { userList } = useSelector((state) => state.manageUserAdmin);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSearchQuery("");
    };
    //-----------------------------ban detail-----------------------------------
    const handleOpenBanDetails = (reason) => {
        setBanReason(reason);
        setOpenPopupDetails(true);
    };

    const CloseBanDetails = () => {
        setOpenPopupDetails(false);
    };

    //----------------------------------------------------------------
    useEffect(() => {
        dispatch(getListBanUser());
    }, [dispatch]);

    useEffect(() => {
        setFilterUsers(userList);
        console.log("first", userList);
    }, [userList]);
    //- - - POPUP UNBAN success- - - - - - - - - - - - - -
    const handleUnBanSuccess = () => {
        setOpenPopupUnbanSuccess(true);
    };
    const closePopupUnBanSuccess = () => {
        setOpenPopupUnbanSuccess(false);
    };
    //- - - POPUP UNBAN- - - - - - - - - - - - - -
    const handleUnBanAction = (id, fullName) => {
        setUserID(id);
        setFullName(fullName);
        setOpenPopupUnban(true);
    };
    const closePopupUnBan = () => {
        setOpenPopupUnban(false);
    };
    const handleUnBanUser = async (userId) => {
        dispatch(putUnBanUser(userId));
        setOpenPopupUnban(false);
        handleUnBanSuccess();
    };
    const filteredRows = filterUsers.filter(
        (row) =>
            row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.phone.includes(searchQuery)
    );

    const slicedRows = filteredRows.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <div
            style={{
                display: "revert",
                justifyContent: "flex-end",
            }}
        >
            <h1 style={{ textIndent: "40%" }}>Black list</h1>

            <div
                className="search-bar"
                style={{ display: "", justifyContent: "flex-end" }}
            >
                <TextField
                    id="search"
                    type="search"
                    label="Search"
                    style={{ marginLeft: "71%", marginBottom: "1%" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                // onClick={handleSearch}
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
                                <SearchIcon sx={{ color: "white" }} />
                            </IconButton>
                        ),
                    }}
                />
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: "black",
                                    fontSize: "14",
                                    fontWeight: 600,
                                    wordWrap: "break-word",
                                }}
                            >
                                Full Name{" "}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: "black",
                                    fontSize: "14",
                                    fontWeight: 600,
                                    wordWrap: "break-word",
                                }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: "black",
                                    fontSize: "14",
                                    fontWeight: 600,
                                    wordWrap: "break-word",
                                }}
                            >
                                Phone{" "}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "black",
                                    fontSize: "14",
                                    fontWeight: 600,
                                    wordWrap: "break-word",
                                }}
                            >
                                Reason{" "}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: "black",
                                    fontSize: "14",
                                    fontWeight: 600,
                                    wordWrap: "break-word",
                                }}
                            ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">
                                    {row.phone}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleOpenBanDetails(row.note)
                                        }
                                    >
                                        Detail
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        aria-label="Unban"
                                        sx={{ color: "red" }}
                                        onClick={() =>
                                            handleUnBanAction(
                                                row.id,
                                                row.fullName
                                            )
                                        }
                                    >
                                        Unban
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                style={{ marginLeft: "20px" }}
            />
            <PopupUnban
                open={openPopupUnban}
                onClose={closePopupUnBan}
                onUnBan={handleUnBanUser}
                userId={userID}
            />
            <PopupUnbanSuccess
                open={openPopupUnbanSuccess}
                onClose={closePopupUnBanSuccess}
                value={fullName}
            />
            <PopupBanDetails
                open={openPopupDetails}
                onClose={CloseBanDetails}
                reason={banReason}
            />
        </div>
    );
};

export default ListBanUser;
