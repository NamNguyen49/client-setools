import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import StudentPage from '../pages/student/studentPage';


function RouterApp() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/student" element={<StudentPage />} />
            </Routes>
        </Router>
    );
}

export default RouterApp;
