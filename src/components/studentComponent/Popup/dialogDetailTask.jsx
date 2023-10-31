import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select"
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';
import Delete from "./confirm"
const DetailTaskPopup = ({ open, onClose, cardKey }) => {
    const [openConfirm, setOpenConfirm] = useState(false)
    const [taskId, setTaskId] = useState("")
    const [task, setTask] = useState({
        TaskId: '',
        NameTask: '',
        DescriptionTask: '',
        Approve: '',
        StudentId: '',
        Deadline: '',
        TeacherId: '',
        Comment: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };
    const URL_TASK = `https://64783a97362560649a2d5a27.mockapi.io/api/TASK`
    const fetchTaskDetailData = async () => {
        try {
            const response = await fetch(`${URL_TASK}/${cardKey}`);
            if (!response.ok) {
                throw new Error("Network error - Unable to connect to the server.");
            }
            const data = await response.json();
            setTask({
                TaskId: data.TaskId || "",
                NameTask: data.NameTask || "",
                DescriptionTask: data.DescriptionTask || "",
                Approve: data.Approve || "",
                StudentId: data.StudentId || "",
                Deadline: data.Deadline || "",
                TeacherId: data.TeacherId || "",
                ProjectId: data.ProjectId || "",
                Comment: data.Comment || "",
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTaskDetailData();
    }, [cardKey]);

    const updateTask = async () => {
        // Create an object with the form data
        const formData = {
            TaskId: cardKey,
            NameTask: task.NameTask,
            DescriptionTask: task.DescriptionTask,
            Approve: task.Approve,
            StudentId: task.StudentId,
            Deadline: task.Deadline,
            TeacherId: task.TeacherId,
            ProjectId: task.ProjectId,
            Comment: task.Comment
        };
        try {
            const response = await fetch(`${URL_TASK}/${cardKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network error - Unable to connect to the server.");
            }

            const data = await response.json();
            console.log("Task updated successfully: ", data);
            popupToastOke();

        } catch (error) {
            console.error(error);
            popupToastfail();
        };

    };
    const ConfirmDelete = async (id) => {
        setTaskId(id)
        setOpenConfirm(true);
    };
    const DeleteById = async () => {
        const id = taskId;
        try {
            const response = await fetch(`${URL_TASK}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },

            });

            if (!response.ok) {
                throw new Error("Network error - Unable to connect to the server.");
            }

            const data = await response.json();
            console.log("Delete successfully: ", data);
            toast("Delete successful", {
                type: "default",
            });

        } catch (error) {
            console.error(error);
            toast("Delete fail", {
                type: "error",
            });
        };
        setTaskId("")
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    };
    const popupToastOke = () => {
        toast("Update successful", {
            type: "success",
        });

        // Sau khi hiển thị thông báo, làm mới trang sau 1 giây
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    };
    const popupToastfail = () => toast("Update successful");

    return (
        <Dialog
            // fullScreen 
            open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detail Task
                <IconButton onClick={onClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
            </DialogTitle>
            <DialogContent>

                <Stack spacing={2} margin={2}>
                    <TextField
                        variant="outlined"
                        label="Name task"
                        name="NameTask"
                        value={task.NameTask || ''}

                        onChange={handleChange}
                    />


                    <TextField
                        variant="outlined"
                        label="Description Task "
                        name="DescriptionTask"
                        value={task.DescriptionTask || ''}
                        multiline
                        onChange={handleChange}
                    />

                    <TextField
                        variant="outlined"
                        label="Assignee"
                        name="StudentId"
                        value={task.StudentId || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Deadline"
                        name="Deadline"
                        value={task.Deadline}
                        onChange={handleChange}
                    />
                    <Select
                        name="Approve"
                        value={task.Approve || ""} // Handle the case where userData is null
                        onChange={handleChange}
                        sx={{ width: "50%" }}
                    >
                        <MenuItem value={"To Do"}>To Do</MenuItem>
                        <MenuItem value={"In Progress"}>In Progress</MenuItem>
                        <MenuItem value={"Done"}>Done</MenuItem>

                    </Select>

                    <TextField
                        variant="outlined"
                        label="Comment"
                        name="Comment"
                        value={task.Comment || ''}
                        onChange={handleChange}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => ConfirmDelete(task.TaskId)}
                        >
                            Delete
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={updateTask}

                        >
                            Update
                        </Button>
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
            </DialogActions>

            <Delete
                openConfirm={openConfirm}
                onCloseConfirm={() => setOpenConfirm(false)}
                onDelete={() => DeleteById()}
            />
        </Dialog>

    );
}

export default DetailTaskPopup;