import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import { ScreenMode } from '../pages/SigninPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupForm = ({ onSwitchMode }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    const userCredentials = {
      username,
      email,
      password,
      role: 'student',
    };

    axios.get('https://6547582e902874dff3ac2f96.mockapi.io/account/user?email=' + email)
      .then((response) => {

        if (response.data.length > 0) {
          alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        } else {

          axios.post('https://6547582e902874dff3ac2f96.mockapi.io/account/user', userCredentials)
            .then((response) => {
              console.log('Tạo tài khoản thành công', response.data);
              onSwitchMode(ScreenMode.SIGN_IN);
            })
            .catch((error) => {
              console.error('Lỗi khi tạo tài khoản', error);
            });
        }
      })
      .catch((error) => {
        console.error('Lỗi khi kiểm tra email', error);
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
            SIGNUP
          </Typography>
          <Typography color={colors.grey[600]}>
            Elevate Success with SETOOL Project Management
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Name</Typography>
              <TextField
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>
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
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
