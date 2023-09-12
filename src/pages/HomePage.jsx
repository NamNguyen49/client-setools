import React from 'react'

export const HomePage = () => {
    return (
        <div className="App" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="../assets/home.jpg" alt="Hình ảnh toàn màn hình" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    )
}
