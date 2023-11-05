import React, { useState, useEffect } from 'react';
import "./style.css";
import Column from "../studentComponent/column/Column";
import { ColumnNames } from "../constants";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import SingleCard from "../studentComponent/singleCard/SingleCard";

import MemberList from './MemberList'
import Footer from '../Footer/Footer'
export default function App() {
  const { ToDo, InProgress, Review, Done } = ColumnNames;
  const [progress, setProgress] = useState("");
  const [addColumn, setAddColumn] = useState("");
  const [modalData, setModalData] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [open, setOpen] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [items, setItems] = useState([]);


  const [columnsArr, setColumnsArr] = useState([
    { id: 1, title: ToDo }, //set theo status 
    { id: 2, title: InProgress },
    { id: 3, title: Done }
  ]);
  const URL_TASK = 'https://64783a97362560649a2d5a27.mockapi.io/api/TASK'
  const fetchTaskData = () => {
    fetch(URL_TASK)
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi mạng - Không thể kết nối đến server.');
        }
        return response.json();
      })
      .then(data => {
        setItems(data)
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    getDataInProgress();
  }
  useEffect(() => {
    fetchTaskData();
  }, []);

  const isMobile = window.innerWidth < 600;

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copyArray = [...prevState];
        const prevItem = copyArray.splice(hoverIndex, 1, dragItem);
        copyArray.splice(dragIndex, 1, prevItem[0]);
        return copyArray;
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    const newItem = {

      NameTask: modalData,
      ProjectId: items.ProjectId,
      TeacherId: items.TeacherId,
      Approve: ToDo,
      StudentId: assignee,
      DescriptionTask: description,
      Deadline: deadline,
      Comment: " "
    };
    fetch(`${URL_TASK}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error - Unable to connect to the server.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task updated successfully: ", data);
        toast("Create new task successful", {
          type: "success",
          timeout: 2000,
        });
        fetchTaskData();


      })
      .catch((error) => {
        console.error(error);

      });
    setItems([...items, newItem]);
    setModalData("");
    setAssignee("");
    setDescription("");
    setDeadline("");
    handleClose();
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.Approve === columnName)
      .map((item, index) => {

        return (
          <SingleCard
            id={item.TaskId}
            name={item.StudentId}
            setItems={setItems}
            username={item.NameTask}
            index={index}
            moveCardHandler={moveCardHandler}
            columnsArr={columnsArr}
            deadline={item.Deadline}
            Approve={item.Approve}
          >
          </SingleCard>
        );
      });
  };
  const calculateColumnHeight = (columnName) => {
    const itemsInColumn = items.filter((item) => item.Approve === columnName);
    const height = `${itemsInColumn.length * 250}vh`; // Điều chỉnh chiều cao theo ý muốn
    return height;
  };
  const getItemsInColumn = (columnName) => {
    return items.filter((e) => e.Approve === columnName);
  };

  const getDataInProgress = () => {
    const result = getItemsInColumn(InProgress);
    const toDoLength = getItemsInColumn(ToDo).length;
    const totalProgress = (result.length / (result.length + toDoLength)) * 100;
    setProgress(
      isNaN(totalProgress.toString()) ? "0" : totalProgress.toString()
    );
  };



  const handleModalDataChange = (e) => {
    setModalData(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");


  const handleAddMember = () => {
    fetch('https://64a6238b00c3559aa9c06117.mockapi.io/manageContact')
      .then(response => response.json())
      .then(data => {
        const emailExistsInMock = data.some(member => member.email === email);

        if (!emailExistsInMock) {
          console.error('Email not found in mock data');
          
          return;
        }

        setMembers([...members, { email }]);
        setEmail(''); // Xóa email trong trường input sau khi thêm
      })
      .catch(error => {
        console.error('Error fetching data from mock API:', error);
      });
  }



  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={() => handleAddMember(email)}>Add Member</Button>
      </div>
      <div className="container" style={{ justifyContent: "center" }}>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          {columnsArr.map((e) => {
            return (
              <Column
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                modalData={modalData}
                handleModalDataChange={handleModalDataChange}
                handleAssigneeChange={handleAssigneeChange}
                handleDescriptionChange={handleDescriptionChange}
                handleDeadlineChange={handleDeadlineChange}
                handleModalSave={handleModalSave}
                key={e.id}
                buttonPresent={e.title === ToDo ? true : false}
                progressPresent={e.title === InProgress ? true : false}
                title={e.title}
                progress={progress}
                className="column"
                style={{ height: calculateColumnHeight(e.title) }}

              >
                {returnItemsForColumn(e.title)}
              </Column>
            );
          })}
        </DndProvider>
      </div>
      <MemberList members={members} />
     
    </>
  );
}