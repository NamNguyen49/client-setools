
import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
export function SidebarData() {
    const [projects, setProjects] = useState([]);

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

    return [
        {
            title: "Home",
            icon: <HomeIcon />,
            link: "/student",
        },
        ...projects.map((projectName, index) => ({
            title: projectName,
            icon: <LocalCafeIcon />,
            link: `/student`, // Thay đổi link dựa trên index hoặc dữ liệu khác nếu cần
        })),
    ];
}


