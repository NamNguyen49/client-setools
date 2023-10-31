import "./style.css";
import { useDrop } from "react-dnd";

import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
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



  const body = (
    <div className="modalContainer" >
      <h2 style={{ textAlign: 'center' }}>Create Task</h2>
      <form onSubmit={handleModalSave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="taskName" className="input-task">Task Name:</label><br />
          <TextField
            id="taskName"
            className="NameTask"
            onChange={handleModalDataChange}
            value={modalData}
            type="text"
            placeholder="Enter Task Name"
            sx={{ width: '120%' }}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="description" className="input-task">Description:</label>
          <br />
          <TextField
            id="description"
            className="DescriptionTask"
            onChange={handleDescriptionChange}
            type="text"
            placeholder="Enter Description"
            multiline
            sx={{ width: '101.5%' }}
            required
          />
        </div>


        <div style={{ marginTop: "10px" }}>
          <label htmlFor="assignee" className="input-task">Email Assignee:</label><br />
          <TextField
            id="assignee"
            className="StudentId"
            sx={{ width: '120%' }}
            onChange={handleAssigneeChange}
            type="text"
            placeholder="Enter Assignee"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="deadline" className="input-task">Deadline:</label><br />
          <input
            className="Deadline"
            type="date"
            id="deadline"
            onChange={handleDeadlineChange}
            requiredx 
          />
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



