import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@mui/material";
import React, { useEffect, useState } from "react";
const URL = "https://6479a016a455e257fa637183.mockapi.io/TblAccount";
const UnBanDialog = ({ open, onClose, onUnBan, userId }) => {
  const [userData, setUserData] = useState(null);

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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {" "}
        {userData ? (
          <p>Are you sure to unban {userData.fullName} ?</p>
        ) : (
          <p>Loading...</p>
        )}
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onUnBan(userData.id)} color="error">
          Confirm
        </Button>
      </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default UnBanDialog;
