import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectButton from '../components/ProjectButton';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/signin');
    };


    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <ProjectButton />

            {/* <button
                onClick={handleLoginClick}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '20px',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Login
            </button> */}
        </div>
    );
};
