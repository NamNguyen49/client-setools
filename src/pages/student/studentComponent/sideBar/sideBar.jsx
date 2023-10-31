import React, { useState,useEffect } from 'react'
import './sideBar.css'
import { sideBarData } from './sideBarData'
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
function SideBar({ openDrawer }) {
  const [sideBarDataAPI, SetSideBarData] = useState("")
  const URL_TASK = 'https://64783a97362560649a2d5a27.mockapi.io/api/TASK'
  const fetchProject = () => {
    fetch(URL_TASK)
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi mạng - Không thể kết nối đến server.');
        }
        return response.json(); // Chuyển đổi dữ liệu JSON từ phản hồi
      })
      .then(data => {
        SetSideBarData(data)
        console.log(data); // In dữ liệu lấy được từ server lên console
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <div className='SideBar'>
      <ul className='SideBarList'>
        <li className='home'
          onClick={() => {

          }}>
          <div id='icon'>
            <HomeIcon />
          </div>
          <div id='title'>Home
          </div>
        </li>

        {sideBarData.map((value, key) => {
          return (
            <li id={window.location.pathname === value.link ? "Active" : ""} className='row' key={key}
              onClick={() => {
                window.location.pathname = value.link;
                openDrawer(false);
              }}>
              <div id='icon'>
                {value.icon}
              </div>
              <div id='title'>{value.titile}
              </div>
            </li>
          );
        })}
        <li>
          <Button  className='createProject'>
            Create new project
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default SideBar