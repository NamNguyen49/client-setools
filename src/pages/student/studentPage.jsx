import React from 'react';

import SearchAppBar from '../../components/studentComponent/navBar/navBar';
import StudentProject from '../../components/studentDashBoard/studentProject';

const StudentPage = () => {




    return (
        <div>
            <SearchAppBar />
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>
                <StudentProject />
            </div>
        </div>
    );
}

export default StudentPage;
