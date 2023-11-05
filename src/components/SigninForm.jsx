import { ScreenMode } from '../pages/SigninPage';

import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authActions';

const SigninForm = ({ onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const userCredentials = {
      email,
      password,
    };
    axios.get('https://6547582e902874dff3ac2f96.mockapi.io/account/user')
      .then((response) => {
        if (response.status === 200) {
          const userList = response.data;
          const matchedUser = userList.find((user) => user.email === userCredentials.email && user.password === userCredentials.password);
          if (matchedUser) {
            if (matchedUser.role === 'admin') {
              navigate('/admin');
            } else if (matchedUser.role === 'student') {
              navigate('/student');
            } else if (matchedUser.role === 'teacher') { // Add this check for "teacher"
              navigate('/teacher');
            }
            else {
              console.error('Vai trò không hợp lệ');
            }
            dispatch(loginSuccess(matchedUser));
          } else {
            console.error('Đăng nhập thất bại: Tên người dùng hoặc mật khẩu không đúng.');
          }
        } else {
          console.error('Lỗi khi lấy danh sách người dùng từ máy chủ API');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập: ', error);
      });
  };



  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800]
      }}
    >
      <Stack spacing={5} sx={{
        width: "100%",
        maxWidth: "500px"
      }}>
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Welcome SETOOL
          </Typography>
          <Typography color={colors.grey[600]}>
            Elevate Success with SETOOL Project Management
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </Stack>
          <Button
            variant='contained'
            size='large'
            sx={{
              bgcolor: colors.grey[800],
              "&:hover": {
                bgcolor: colors.grey[600]
              }
            }}
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </Stack>




        <Stack direction="row" spacing={2}>
          <Typography>Don't have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
    </Stack >
  );
};

export default SigninForm;
