import React from 'react';

import SearchAppBar from '../components/studentComponent/navBar/navBar';
import Footer from '../components/Footer/Footer';
import Info from '../components/Profile/info';

const Profile = () => {
    return (
        <div>
            <SearchAppBar />
            <Info />
            <Footer />
        </div>
    );
};

export default Profile;
