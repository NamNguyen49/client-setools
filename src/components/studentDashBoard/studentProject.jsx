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
import Modalpopup from "../studentComponent/Popup/Modalpopup";
import MemberList from './MemberList'
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
        return response.json(); // Chuyển đổi dữ liệu JSON từ phản hồi
      })
      .then(data => {
        setItems(data)
        console.log(data); // In dữ liệu lấy được từ server lên console
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
            username={item.DescriptionTask}
            index={index}
            moveCardHandler={moveCardHandler}
            columnsArr={columnsArr}
          >
          </SingleCard>
        );
      });
  };
  const calculateColumnHeight = (columnName) => {
    const itemsInColumn = items.filter((item) => item.Approve === columnName);
    // Tính chiều cao dựa trên số lượng mục trong cột
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

  // const handleAddMember = () => {
  //   setOpenCreateGroup(true);
  // }

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
  // const handleAddMember = () => {
  //   // Kiểm tra tính hợp lệ của email
  //   if (!validateEmail(email)) {
  //     // Hiển thị thông báo lỗi hoặc thực hiện xử lý khác
  //     console.error("Invalid email address");
  //     return;
  //   }

  //   // Gửi email lên mock API để thêm vào danh sách member
  //   fetch('https://64a6238b00c3559aa9c06117.mockapi.io/manageContact', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Gửi thành công, có thể cập nhật danh sách member
  //       // Cập nhật danh sách member ở đây (nếu bạn hiển thị danh sách member)
  //       setEmail(""); // Xóa email trong trường input

  //       // Sau khi thêm email mới, lấy thông tin thành viên qua địa chỉ email
  //       fetch(`https://your-api-url.com/members?email=${email}`)
  //         .then(response => response.json())
  //         .then(memberData => {
  //           // memberData là thông tin của thành viên có địa chỉ email tương ứng
  //           // Sử dụng thông tin này để hiển thị số lượng người tham gia dự án hoặc thực hiện các tác vụ khác
  //           console.log("Member Data:", memberData);
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  const handleAddMember = () => {
    // Kiểm tra xem email người dùng nhập liệu có tồn tại trong danh sách mock không
    fetch('https://64a6238b00c3559aa9c06117.mockapi.io/manageContact')
      .then(response => response.json())
      .then(data => {
        const emailExistsInMock = data.some(member => member.email === email);

        if (!emailExistsInMock) {
          console.error('Email not found in mock data');
          return;
        }

        // Email hợp lệ, thêm vào danh sách members và render ra màn hình
        setMembers([...members, { email }]);
        setEmail(''); // Xóa email trong trường input sau khi thêm
      })
      .catch(error => {
        console.error('Error fetching data from mock API:', error);
      });
  }



  const validateEmail = (email) => {
    // Đây là một ví dụ đơn giản để kiểm tra định dạng email, bạn có thể sử dụng biểu thức chính quy hoặc thư viện để kiểm tra email một cách chi tiết hơn.
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
        <Button onClick={handleAddMember}>Add Member</Button>
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
        {/* <Modalpopup
          open={openCreateGroup}
          onClose={() => setOpenCreateGroup(false)}
        /> */}


      </div>

      <MemberList members={members} />
    </>
  );
}