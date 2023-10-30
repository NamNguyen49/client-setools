import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Delete = ({ openConfirm, onCloseConfirm, onDelete }) => {
    const [open, setOpen] = React.useState(false);


    return (
        <div>

            <Dialog
                open={openConfirm}
                onClose={onCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure delete this task
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDelete} autoFocus>
                        Agree
                    </Button>
                    <Button onClick={onCloseConfirm}>Disagree</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Delete;