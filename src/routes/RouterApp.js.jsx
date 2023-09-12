import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';

function RouterApp() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<SigninPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default RouterApp;
