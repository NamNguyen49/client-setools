import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react";

const Modalpopup = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleSubmit = async () => {

        const projectName = formData.ProjectName;
        const projectExists = await checkProjectExists(projectName);

        if (projectExists) {
            alert(`Dự án với tên "${projectName}" đã tồn tại.`);
        } else {
            createNewProject();
        }
    }

    const checkProjectExists = async (projectName) => {
        try {
            const response = await fetch('https://64a6238b00c3559aa9c06117.mockapi.io/Student', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                return data.some(project => project.projectName === projectName);
            } else {
                console.error('Lỗi khi truy vấn dự án từ mock API.');
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const createNewProject = () => {
        const newProject = {
            projectName: formData.ProjectName,
            groupID: formData.GroupId,
            projectDescription: formData.ProjectDes,
            startDay: formData.StartDay,
            endDay: formData.EndDay,
            teacherId: formData.TeacherId,
        };

        fetch('https://64a6238b00c3559aa9c06117.mockapi.io/Student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        })
            .then(response => response.json())
            .then(data => {
                setFormData({
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
            <Button onClick={functionopenpopup} color="primary" variant="contained">Create a new project</Button>
            <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Add project detail  <IconButton onClick={closepopup} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            label="Project Name"
                            name="ProjectName"
                            value={formData.ProjectName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="Group ID"
                            name="GroupId"
                            value={formData.GroupId}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="Project Description"
                            name="ProjectDes"
                            value={formData.ProjectDes}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="Start Day"
                            name="StartDay"
                            value={formData.StartDay}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="End Day"
                            name="EndDay"
                            value={formData.EndDay}
                            onChange={handleChange}
                            required
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Agree to terms & conditions"
                            required
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
