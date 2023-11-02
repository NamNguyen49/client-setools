import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const PopupBanSuccess = ({ open, onClose , value}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ban Successful</DialogTitle>
      <DialogContent>
        <div>{value} has been banned .</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupBanSuccess;
