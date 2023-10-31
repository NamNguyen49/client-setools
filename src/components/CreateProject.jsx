// import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
// import FormControlContext from "@mui/material/FormControl/FormControlContext";
// import CloseIcon from "@mui/icons-material/Close"
// import { useState } from "react";

// const Modalpopup = () => {
//     const [open, openchange] = useState(false);
//     const functionopenpopup = () => {
//         openchange(true);
//     }
//     const closepopup = () => {
//         openchange(false);
//     }

//     return (
//         <div style={{ textAlign: 'center' }}>

//             <Button onClick={functionopenpopup} color="primary" variant="contained"> Create a new project</Button>
//             <Dialog
//                 // fullScreen 
//                 open={open} onClose={closepopup} fullWidth maxWidth="sm">
//                 <DialogTitle>Add project detail  <IconButton onClick={closepopup} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
//                 <DialogContent>

//                     <Stack spacing={2} margin={2}>
//                         <TextField
//                             variant="outlined"
//                             label="Project ID"
//                             name="ProjectId"
//                         // value={formData.ProjectId}
//                         // onChange={handleChange}
//                         />
//                         <TextField
//                             variant="outlined"
//                             label="Project Name"
//                             name="ProjectName"
//                         // value={formData.ProjectName}
//                         // onChange={handleChange}
//                         />
//                         <TextField
//                             variant="outlined"
//                             label="Group ID"
//                             name="GroupId"
//                         // value={formData.GroupId}
//                         // onChange={handleChange}
//                         />
//                         <TextField
//                             variant="outlined"
//                             label="Project Description"
//                             name="ProjectDes"
//                         // value={formData.ProjectDes}
//                         // onChange={handleChange}
//                         />
//                         <TextField
//                             variant="outlined"
//                             label="Start Day"
//                             name="StartDay"
//                         // value={formData.StartDay}
//                         // onChange={handleChange}
//                         />
//                         <TextField
//                             variant="outlined"
//                             label="End Day"
//                             name="EndDay"
//                         // value={formData.EndDay}
//                         // onChange={handleChange}
//                         />
//                         {/* <TextField
//                             variant="outlined"
//                             label="Teacher ID"
//                             name="TeacherId"
//                         value={formData.TeacherId}
//                         onChange={handleChange}
//                         /> */}
//                         <FormControlLabel
//                             control={<Checkbox color="primary" />}
//                             label="Agree to terms & conditions"
//                         />
//                         <Button
//                             color="primary"
//                             variant="contained"
//                         // onClick={handleSubmit}
//                         >
//                             Submit
//                         </Button>
//                     </Stack>
//                 </DialogContent>
//                 <DialogActions>
//                     {/* <Button color="success" variant="contained">Yes</Button>
//                     <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default Modalpopup;
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react";

const Modalpopup = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        ProjectId: "",
        ProjectName: "",
        GroupId: "",
        ProjectDes: "",
        StartDay: "",
        EndDay: "",
        TeacherId: ""
    });

    const functionopenpopup = () => {
        setOpen(true);
    }

    const closepopup = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        // Xây dựng dữ liệu project từ formData
        const newProject = {
            projectID: formData.ProjectId,
            projectName: formData.ProjectName,
            groupID: formData.GroupId,
            projectDescription: formData.ProjectDes,
            sartDay: formData.StartDay,
            endDay: formData.EndDay,
            teacherId: formData.TeacherId,
        };

        // Gửi dữ liệu lên mock API
        fetch('https://64a6238b00c3559aa9c06117.mockapi.io/Student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        })
            .then(response => response.json())
            .then(data => {
                // Gửi thành công, có thể cập nhật danh sách project
                // và đóng dialog
                // Cập nhật danh sách project ở đây (nếu bạn sử dụng useState)
                setFormData({
                    ProjectId: "",
                    ProjectName: "",
                    GroupId: "",
                    ProjectDes: "",
                    StartDay: "",
                    EndDay: "",
                    TeacherId: ""
                });
                setOpen(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Button onClick={functionopenpopup} color="primary" variant="contained"> Create a new project</Button>
            <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Add project detail  <IconButton onClick={closepopup} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            label="Project ID"
                            name="ProjectId"
                            value={formData.ProjectId}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Project Name"
                            name="ProjectName"
                            value={formData.ProjectName}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Group ID"
                            name="GroupId"
                            value={formData.GroupId}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Project Description"
                            name="ProjectDes"
                            value={formData.ProjectDes}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Start Day"
                            name="StartDay"
                            value={formData.StartDay}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="End Day"
                            name="EndDay"
                            value={formData.EndDay}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Teacher ID"
                            name="TeacherId"
                            value={formData.TeacherId}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Agree to terms & conditions"
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Modalpopup;
