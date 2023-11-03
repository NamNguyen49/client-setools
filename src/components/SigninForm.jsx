import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from '../pages/SigninPage';
import { GoogleLogin } from 'react-google-login';
// import GithubLogin from 'react-github-login';

import { useNavigate } from 'react-router-dom';
const SigninForm = ({ onSwitchMode }) => {

  const navigate = useNavigate();

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
              <TextField />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField type='password' />
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
            onClick={() => {

              navigate('/student');
            }}
          >
            Sign in
          </Button>
        </Stack>

        <Stack spacing={2}>
          <GoogleLogin
            clientId="680986507255-6hqu7nnvr27a5s60lq3m50231lisrq3q.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={response => {
              // Handle successful Google login
              navigate('/student');
              console.log(response);
            }}
            onFailure={error => {
              // Handle Google login failure
              console.error(error);
            }}
          />
          {/* <GithubLogin
    clientId="YOUR_GITHUB_CLIENT_ID"
    onSuccess={response => {
      // Handle successful GitHub login
      console.log(response);
    }}
    onFailure={error => {
      // Handle GitHub login failure
      console.error(error);
    }}
  /> */}
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
    </Stack>
  );
};

export default SigninForm;