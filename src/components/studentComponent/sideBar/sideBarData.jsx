

import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

export function SidebarData() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Gọi API để lấy danh sách project từ URL API
        fetch('https://64a6238b00c3559aa9c06117.mockapi.io/Student')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi mạng - Không thể kết nối đến server.');
                }
                return response.json(); // Chuyển đổi dữ liệu JSON từ phản hồi
            })
            .then(data => {
                // Lấy danh sách tên các project từ dữ liệu API
                const projectNames = data.map(item => item.projectName);
                setProjects(projectNames);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const deleteProject = (projectName) => {

        if (window.confirm("Are you sure?")) {
            // Người dùng đã xác nhận, gửi yêu cầu xóa dự án đến mock API
            fetch('https://64a6238b00c3559aa9c06117.mockapi.io/Student', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName: projectName }),
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật danh sách dự án
                        setProjects(prevProjects => prevProjects.filter(project => project !== projectName));
                    } else {
                        console.error('Lỗi khi xóa dự án từ mock API.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return [
        {
            title: "Home",
            icon: <HomeIcon />,
            link: "/home",
        },
        ...projects.map((projectName, index) => ({
            title: (
                <div>
                    {projectName}
                    <Button onClick={() => deleteProject(projectName)}><DeleteIcon /></Button>
                </div>
            ),
            icon: <LocalCafeIcon />,
            link: `/student`, // Thay đổi link dựa trên index hoặc dữ liệu khác nếu cần
        })),
    ];
}

