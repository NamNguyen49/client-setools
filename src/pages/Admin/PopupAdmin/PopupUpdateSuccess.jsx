import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const PopupUpdateSuccess = ({ open, onClose ,value}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update</DialogTitle>
      <DialogContent>
       {value} is updated.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupUpdateSuccess;
