import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { HomePage } from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import StudentPage from '../pages/student/studentPage';
import Teacher from '../../src/pages/teacher/Teacher';
import ListUser from '../../src/pages/Admin/ListUser';
import Profile from '../pages/Profile';
function RouterApp() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/signin" element={<SigninPage />} /> */}
                <Route path="/" element={<SigninPage />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/admin" element={<ListUser />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default RouterApp;
