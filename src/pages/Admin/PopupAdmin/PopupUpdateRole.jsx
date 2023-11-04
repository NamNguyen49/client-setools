import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getUserByID } from "../../../Redux/Admin/userSlice";

const UpdateDialog = ({ open, onClose, onUpdate, userId }) => {
  const [userData, setUserData] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); // Initialize as null
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.manageUserAdmin);

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    if (userData) {
      setSelectedRole(userData.role);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getUserByID(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Detail user</DialogTitle>
        <DialogContent
          sx={{
            marginLeft: "-145px",
            padding: "20px 182px",
            marginRight: "10px",
          }}
        >
          <DialogTitle sx={{ padding: "16px 0" }}>Full Name</DialogTitle>
          <DialogContentText sx={{ padding: "0 20px" }}>
            {userData?.fullName}
          </DialogContentText>
          <DialogTitle sx={{ padding: "16px 0" }}>Phone</DialogTitle>
          <DialogContentText sx={{ padding: "0 20px" }}>
            {userData?.phone}
          </DialogContentText>
          <DialogTitle sx={{ padding: "16px 0" }}>Email</DialogTitle>
          <DialogContentText sx={{ padding: "0 20px" }}>
            {userData?.email}
          </DialogContentText>
          <DialogTitle sx={{ padding: "16px 0" }}>Role</DialogTitle>
          <Select
            value={selectedRole || ""} // Handle the case where userData is null
            onChange={handleChange}
            sx={{ width: "150%" }}
          >
            <MenuItem value={"recruiter"}>Recruiter</MenuItem>
            <MenuItem value={"interviewer"}>Interviewer</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onUpdate(userData?.id, selectedRole)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateDialog;
