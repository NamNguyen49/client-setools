import React from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Container, Grid, Paper, Typography, TextField } from '@mui/material';

const Info = () => {
    return (
        <div style={{ padding: '30px' }} >
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            style={{
                                backgroundColor: 'white', // White background
                                border: '1px solid #f5f5f5', // 1px border with color #f5f5f5
                                // Add more styles as needed
                            }}
                        >
                            <div className="panel panel-default">
                                <div className="panel-body text-center">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                        className="img-circle profile-avatar"
                                        alt="User avatar"
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h3 className="panel-title" style={{ margin: '0' }}>Nam Nguyen</h3>
                            </div>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #f5f5f5',
                                padding: '20px', // Add padding to the Paper container
                            }}
                        >
                            <form className="form-horizontal">
                                <div className="panel panel-default">
                                    <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                        <h4 className="panel-title" style={{ margin: '0' }}>Profile User</h4>
                                    </div>
                                    <div style={{ borderBottom: '1px solid #f5f5f5', marginBottom: '10px' }}></div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">Email</h4>
                                    </div>
                                    <div className="panel-body">
                                        namnguyen09042001@gmail.com
                                    </div>
                                </div>
                                <br />

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">Role</h4>
                                    </div>
                                    <div className="panel-body">
                                        Student
                                    </div>
                                </div>
                                <br />

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">Phone</h4>
                                    </div>
                                    <div className="panel-body">
                                        0355331494
                                    </div>
                                </div>
                            </form>
                        </Paper>
                        <Paper
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #f5f5f5',
                                padding: '20px',
                                marginTop: '20px',
                            }}
                        >
                            <div className="panel panel-default">
                                <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                    <h4 className="panel-title" style={{ margin: '0' }}>Security</h4>
                                </div>
                                <div style={{ borderBottom: '1px solid #f5f5f5', marginBottom: '10px' }}></div>
                            </div>
                            <br />
                            <div className="panel-body">

                                <Grid item xs={12} sm={6}>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', width: '150%' }}>
                                        <Typography className="col-sm-2 control-label" style={{ width: '210px' }}>
                                            Current password:
                                        </Typography>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                        />

                                    </div>
                                </Grid>
                                <br />

                                <Grid item xs={12} sm={6}>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', width: '150%' }}>
                                        <Typography className="col-sm-2 control-label" style={{ width: '210px' }}>
                                            New password:
                                        </Typography>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                        />

                                    </div>
                                </Grid>





                                <br />
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox id="checkbox_1" />}
                                                label="Make this account public"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <Button type="submit" className="btn btn-primary">Submit</Button>

                                        <Button type="reset" className="btn btn-default">Cancel</Button>
                                    </div>
                                </div>
                                {/*
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox id="checkbox_1" />}
                                                label="Make this account public"
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button variant="outlined" color="default" type="reset">
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid> */}
                            </div>

                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
};

export default Info;
