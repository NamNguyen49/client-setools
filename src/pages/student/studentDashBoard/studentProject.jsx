import React, { useState, useEffect } from 'react';
import "./style.css";
import Column from "../studentComponent/column/Column";
import { ColumnNames } from "../constants";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import SingleCard from "../studentComponent/singleCard/SingleCard";
import Modalpopup from "../studentComponent/Popup/Modalpopup";
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

  const [columnsArr, setColumnsArr] = useState([
    { id: 1, title: ToDo },
    { id: 2, title: InProgress },
    { id: 3, title: Done }
  ]);
  const tasks = [
    { id: 1, name: "Item 1", username: "Hi", column: ToDo },
    { id: 2, name: "Item 2", username: "Hi", column: ToDo },
    { id: 3, name: "Item 3", username: "Hi", column: ToDo }
  ];
  const [items, setItems] = useState(tasks);

  useEffect(() => {
    getDataInProgress();
  }, [items]);

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
      id: items[items.length - 1].id + 1,
      name: modalData,
      column: ToDo,
      assignee: assignee,
      description: description,
      deadline: deadline
    };
    setItems([...items, newItem]);
    setModalData("");
    setAssignee("");
    setDescription("");
    setDeadline("");
    handleClose();
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => {
        return (
          <SingleCard
            key={item.id}
            name={item.name}
            setItems={setItems}
            username={item.username}
            index={index}
            moveCardHandler={moveCardHandler}
            columnsArr={columnsArr}
          >
          </SingleCard>
        );
      });
  };

  const getItemsInColumn = (columnName) => {
    return items.filter((e) => e.column === columnName);
  };

  const getDataInProgress = () => {
    const result = getItemsInColumn(InProgress);
    const toDoLength = getItemsInColumn(ToDo).length;
    const totalProgress = (result.length / (result.length + toDoLength)) * 100;
    setProgress(
      isNaN(totalProgress.toString()) ? "0" : totalProgress.toString()
    );
  };

  const handleAddMember = () => {
    setOpenCreateGroup(true);
  }

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

  return (
    <>
      <button className="btnColumn" onClick={handleAddMember} >
        Add member
      </button>

      <div className="container">
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
              >
                {returnItemsForColumn(e.title)}
              </Column>
            );
          })}
        </DndProvider>
        <Modalpopup
          open={openCreateGroup}
          onClose={() => setOpenCreateGroup(false)}
        />
      </div>
    </>
  );
}
