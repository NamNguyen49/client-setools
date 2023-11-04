import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const PopupBanDetails = ({ open, onClose, reason }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ban Details</DialogTitle>
      <DialogContent>
        <p>{reason}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupBanDetails;

