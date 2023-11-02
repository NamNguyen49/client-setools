import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const PopupUnbanSuccess = ({ open, onClose , value}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{textAlign:"center", color:"blue"}}>Unban</DialogTitle>
      <DialogContent>
      {value} has been returned 
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupUnbanSuccess;
