import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/signin');
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

            <img
                src="/home.jpg"
                alt="Hình ảnh toàn màn hình"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />


            <button
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
            </button>
        </div>
    );
};
