import React from 'react';

import SearchAppBar from './studentComponent/navBar/navBar';
import StudentProject from './studentDashBoard/studentProject';
const StudentPage = () => {
    return (
        <div >
            <SearchAppBar />

            <div style={{  }}>
                <StudentProject />
            </div>
        </div>
    )
}

export default StudentPage;