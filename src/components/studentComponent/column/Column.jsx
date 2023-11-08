import "./style.css";
import { useDrop } from "react-dnd";
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
export default function Column({
  children,
  className,
  title,
  progressPresent = false,
  buttonPresent = false,
  handleModalSave,
  handleModalDataChange, handleAssigneeChange, handleDescriptionChange, handleDeadlineChange,
  handleOpen,
  handleClose,
  modalData,
  open,
  progress
}) {
  const [, drop] = useDrop({
    accept: "Card",
    drop: () => ({ name: title })
  });
  const [members, setMembers] = useState([]);
  const fetchGetMembers = () => {
    fetch('https://6547582e902874dff3ac2f96.mockapi.io/account/user')
      .then(response => response.json())
      .then(data => {
        setMembers(data)
      })
      .catch(error => {
        console.error('Error fetching data from mock API:', error);
      });
  };
  useEffect(() => {
    fetchGetMembers();
  }, []);


  const body = (
    <div className="modalContainer" >
      <h2 style={{ textAlign: 'center' }}>Create Task</h2>
      <form onSubmit={handleModalSave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="divColumn" style={{ display: "flex" }}>
          <div className="column" style={{ flex: 0.5 }}>
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="taskName" className="input-task">Task Name:</label><br />
              <TextField
                id="taskName"
                className="NameTask"
                onChange={handleModalDataChange}
                value={modalData}
                type="text"
                placeholder="Enter Task Name"
                required
              />
            </div>
            {/* Đoạn này là selected */}
            <div style={{ marginTop: "10px" }}>
              {/* <label htmlFor="assignee" className="input-task">Email Assignee:</label><br />
              <TextField
                id="assignee"
                className="StudentId"
                onChange={handleAssigneeChange}
                type="text"
                placeholder="Enter Assignee"
                required
              /> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Assignee
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    onChange={handleAssigneeChange}
                    id="assignee"
                    inputProps={{
                      name: 'age',
                      id: "assignee"
                    }}
                  >
                    {members.map((member) => (
                      <option key={member.id} value={member.email}> {member.email}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="deadline" className="input-task">Deadline:</label><br />
              <input
                className="Deadline"
                type="date"
                id="deadline"
                onChange={handleDeadlineChange}
                required
              />
            </div>
          </div>
          <div className="column" style={{ flex: 1 }}>
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="description" className="input-task">Description:</label>
              <br />
              <TextField
                id="description"
                className="DescriptionTask"
                sx={{ width: "100%" }}
                rows={6}
                onChange={handleDescriptionChange}
                type="text"
                placeholder="Enter Description"
                multiline
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Save</button>
      </form>
    </div>
  );


  return (
    <div ref={drop} className={className}>
      <div className="columnHeading">
        <span>{title}</span>
        <button
          type="button"
          onClick={handleOpen}
          style={{ display: buttonPresent ? "inline-block" : "none" }}
        >
          Create Task
        </button>
        {progressPresent && (
          <p
            className="progressBar"
            style={{ display: "inline-block", marginLeft: "2px" }}
          >
            {/* {progress}% */}
          </p>
        )}
        <Modal open={open} onClose={handleClose}>
          {body}
        </Modal>
      </div>
      {children}
    </div>
  );
}



