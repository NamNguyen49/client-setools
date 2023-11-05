import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector để truy cập trạng thái từ Redux store
import HomePage from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import StudentPage from '../pages/student/studentPage';
import ListUser from '../pages/Admin/ListUser';
import Teacher from '../pages/teacher/Teacher';
import Profile from '../pages/Profile';
import RouteWrapper from './RouteWrapper';

function RouterApp() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Truy cập trạng thái đăng nhập từ Redux store

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SigninPage />} />
                {/* <Route path="/home" element={isAuthenticated ? <RouteWrapper element={<HomePage />} isPrivate={true} /> : <Navigate to="/" />} /> */}


                <Route path="/student" element={isAuthenticated ? <RouteWrapper element={<StudentPage />} isPrivate={true} /> : <Navigate to="/" />} />
                <Route path="/admin" element={isAuthenticated ? <RouteWrapper element={<ListUser />} isPrivate={true} /> : <Navigate to="/" />} />
                <Route path="/teacher" element={isAuthenticated ? <RouteWrapper element={<Teacher />} isPrivate={true} /> : <Navigate to="/" />} />
                <Route path="/profile" element={isAuthenticated ? <RouteWrapper element={<Profile />} isPrivate={true} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default RouterApp;
