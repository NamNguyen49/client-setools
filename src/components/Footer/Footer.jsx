import React from 'react';
import { AiFillFacebook, AiTwotoneMail, AiFillTwitterSquare } from "react-icons/ai";
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <div
            style={{
                height: "150px",
                backgroundColor: "#D6DDFF",
                marginTop: "0rem",
            }}
        >
            <Box sx={{ textAlign: "center", paddingTop: "-2rem" }}>
                <AiFillFacebook style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />
                <AiTwotoneMail style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />
                <AiFillTwitterSquare style={{ margin: '1rem', color: "#9CA3AF", fontSize: "30px" }} />
                <Typography sx={{ color: "#9CA3AF" }}>
                    Made by <span style={{ fontWeight: "bolder" }}>SE TOOL</span>
                </Typography>
                <Typography sx={{ color: "#9CA3AF" }}>
                    © 2023 <span style={{ fontWeight: "bolder" }}>SWP391</span>. All rights reserved
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;
