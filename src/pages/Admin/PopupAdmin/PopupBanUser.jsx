import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
const URL = "https://6479a016a455e257fa637183.mockapi.io/TblAccount";
const BanDialog = ({ open, onClose, onBan, userId }) => {
  const [userData, setUserData] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://6479a016a455e257fa637183.mockapi.io/TblAccount/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (open) {
      fetchUserData();
    }
  }, [open, userId]);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {userData ? (
          <p>Are you sure to ban {userData.fullName}?</p>
        ) : (
          <p>Loading...</p>
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Reason"
          value={reason}
          onChange={handleReasonChange}
          fullWidth
          variant="outlined"
        />
        
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onBan(userData.id, reason)} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
  console.log(reason)   
};

export default BanDialog;
