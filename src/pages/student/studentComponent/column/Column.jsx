import "./style.css";
import { useDrop } from "react-dnd";

import Modal from '@mui/material/Modal';

export default function Column({
  children,
  className,
  title,
  progressPresent = false,
  buttonPresent = false,
  handleModalSave,
  handleModalDataChange,handleAssigneeChange,handleDescriptionChange,handleDeadlineChange,
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
    <div className="modalContainer">
      <h2>Create Task</h2>
      <form onSubmit={handleModalSave}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            id="taskName"
            onChange={handleModalDataChange}
            value={modalData}
            type="text"
            placeholder="Enter Task Name"
          />
        </div>
        <div>
          <label htmlFor="assignee">Người phụ trách:</label>
          <input
            id="assignee"
            onChange={handleAssigneeChange} // Thêm hàm xử lý cho Người phụ trách
            type="text"
            placeholder="Enter Assignee"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            onChange={handleDescriptionChange} // Thêm hàm xử lý cho Description
            type="text"
            placeholder="Enter Description"
          />
        </div>
        <div>
          <label htmlFor="deadline">Thời hạn:</label>
          <input
            id="deadline"
            onChange={handleDeadlineChange} // Thêm hàm xử lý cho Thời hạn
            type="text"
            placeholder="Enter Deadline"
          />
        </div>
        <br />
        <button type="submit">Save</button>
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
            {progress}%
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
