// import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
// import FormControlContext from "@mui/material/FormControl/FormControlContext";
// import CloseIcon from "@mui/icons-material/Close"
// import { useState } from "react";

// const DetailTaskPopup = ({ open, onClose }) => {

//     return (
//         <Dialog
//             // fullScreen 
//             open={open} onClose={onClose} fullWidth maxWidth="sm">
//             <DialogTitle>Add project detail
//                 <IconButton onClick={onClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
//             </DialogTitle>
//             <DialogContent>

//                 <Stack spacing={2} margin={2}>
//                     <TextField
//                         variant="outlined"
//                         label="Project ID"
//                         name="ProjectId"
//                     // value={formData.ProjectId}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="Project Name"
//                         name="ProjectName"
//                     // value={formData.ProjectName}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="Group ID"
//                         name="GroupId"
//                     // value={formData.GroupId}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="Project Description"
//                         name="ProjectDes"
//                     // value={formData.ProjectDes}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="Start Day"
//                         name="StartDay"
//                     // value={formData.StartDay}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="End Day"
//                         name="EndDay"
//                     // value={formData.EndDay}
//                     // onChange={handleChange}
//                     />
//                     <TextField
//                         variant="outlined"
//                         label="Teacher ID"
//                         name="TeacherId"
//                     // value={formData.TeacherId}
//                     // onChange={handleChange}
//                     />
//                     <FormControlLabel
//                         control={<Checkbox color="primary" />}
//                         label="Agree to terms & conditions"
//                     />
//                     <Button
//                         color="primary"
//                         variant="contained"
//                     // onClick={handleSubmit}
//                     >
//                         Submit
//                     </Button>
//                 </Stack>
//             </DialogContent>
//             <DialogActions>
//                 {/* <Button color="success" variant="contained">Yes</Button>
//                     <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
//             </DialogActions>
//         </Dialog>

//     );
// }

// export default DetailTaskPopup;
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";

function DetailTaskPopup({ open, onClose, taskData }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Task Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <strong>Task Name:</strong>
                </DialogContentText>
                <DialogContentText>
                    <strong>Assigned Person:</strong>
                </DialogContentText>
                <DialogContentText>
                    <strong>Description:</strong>
                </DialogContentText>
                <DialogContentText>
                    <strong>Deadline:</strong>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default DetailTaskPopup;