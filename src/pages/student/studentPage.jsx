import React from 'react';

import SideBar from '../../components/studentComponent/sideBar/sideBar';
import SearchAppBar from '../../components/studentComponent/navBar/navBar';
import StudentProject from '../../components/studentDashBoard/studentProject';
import Footer from '../../components/Footer/Footer';
const StudentPage = () => {
    return (
        <div >

            <SearchAppBar />
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>

                <StudentProject />
            </div>
            <Footer />
        </div>
    )
}

export default StudentPage;