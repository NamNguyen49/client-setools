// import React from 'react';
// import { Button, Checkbox, FormControlLabel, FormGroup, Container, Grid, Paper, Typography, TextField } from '@mui/material';
// import { useSelector } from 'react-redux';
// const Info = () => {
//     const user = useSelector((state) => state.auth.user);

//     return (
//         <div style={{ padding: '30px' }} >
//             <Container>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} sm={6}>
//                         <Paper
//                             style={{
//                                 backgroundColor: 'white',
//                                 border: '1px solid #f5f5f5',

//                             }}
//                         >
//                             <div className="panel panel-default">
//                                 <div className="panel-body text-center">
//                                     <img
//                                         src="https://bootdey.com/img/Content/avatar/avatar6.png"
//                                         className="img-circle profile-avatar"
//                                         alt="User avatar"
//                                     />
//                                 </div>
//                             </div>
//                             <br />
//                             <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                 <h3 className="panel-title" style={{ margin: '0' }}>{user.username}</h3>
//                             </div>
//                         </Paper>

//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <Paper
//                             style={{
//                                 backgroundColor: 'white',
//                                 border: '1px solid #f5f5f5',
//                                 padding: '20px',
//                             }}
//                         >
//                             <form className="form-horizontal">
//                                 <div className="panel panel-default">
//                                     <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
//                                         <h4 className="panel-title" style={{ margin: '0' }}>Profile User</h4>
//                                     </div>
//                                     <div style={{ borderBottom: '1px solid #f5f5f5', marginBottom: '10px' }}></div>
//                                 </div>

//                                 <div className="panel panel-default">
//                                     <div className="panel-heading">
//                                         <h4 className="panel-title">Email</h4>
//                                     </div>
//                                     <div className="panel-body">
//                                         namnguyen09042001@gmail.com
//                                     </div>
//                                 </div>
//                                 <br />

//                                 <div className="panel panel-default">
//                                     <div className="panel-heading">
//                                         <h4 className="panel-title">Role</h4>
//                                     </div>
//                                     <div className="panel-body">
//                                         Student
//                                     </div>
//                                 </div>
//                                 <br />

//                                 <div className="panel panel-default">
//                                     <div className="panel-heading">
//                                         <h4 className="panel-title">Phone</h4>
//                                     </div>
//                                     <div className="panel-body">
//                                         0355331494
//                                     </div>
//                                 </div>
//                             </form>
//                         </Paper>
//                         <Paper
//                             style={{
//                                 backgroundColor: 'white',
//                                 border: '1px solid #f5f5f5',
//                                 padding: '20px',
//                                 marginTop: '20px',
//                             }}
//                         >
//                             <div className="panel panel-default">
//                                 <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
//                                     <h4 className="panel-title" style={{ margin: '0' }}>Security</h4>
//                                 </div>
//                                 <div style={{ borderBottom: '1px solid #f5f5f5', marginBottom: '10px' }}></div>
//                             </div>
//                             <br />
//                             <div className="panel-body">

//                                 <Grid item xs={12} sm={6}>
//                                     <div className="form-group" style={{ display: 'flex', alignItems: 'center', width: '150%' }}>
//                                         <Typography className="col-sm-2 control-label" style={{ width: '210px' }}>
//                                             Current password:
//                                         </Typography>
//                                         <TextField
//                                             type="password"
//                                             variant="outlined"
//                                             fullWidth
//                                         />

//                                     </div>
//                                 </Grid>
//                                 <br />

//                                 <Grid item xs={12} sm={6}>
//                                     <div className="form-group" style={{ display: 'flex', alignItems: 'center', width: '150%' }}>
//                                         <Typography className="col-sm-2 control-label" style={{ width: '210px' }}>
//                                             New password:
//                                         </Typography>
//                                         <TextField
//                                             type="password"
//                                             variant="outlined"
//                                             fullWidth
//                                         />

//                                     </div>
//                                 </Grid>





//                                 <br />
//                                 <div className="form-group">
//                                     <div className="col-sm-10 col-sm-offset-2">
//                                         <FormGroup>
//                                             <FormControlLabel
//                                                 control={<Checkbox id="checkbox_1" />}
//                                                 label="Make this account public"
//                                             />
//                                         </FormGroup>
//                                     </div>
//                                 </div>
//                                 <br />
//                                 <div className="form-group">
//                                     <div className="col-sm-10 col-sm-offset-2">
//                                         <Button type="submit" className="btn btn-primary">Submit</Button>

//                                         <Button type="reset" className="btn btn-default">Cancel</Button>
//                                     </div>
//                                 </div>

//                             </div>

//                         </Paper>
//                     </Grid>

//                 </Grid>
//             </Container>
//         </div>
//     );
// };

// export default Info;
import React from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Container, Grid, Paper, Typography, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const Info = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div style={{ padding: '30px' }} >
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #f5f5f5',
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
                                {user ? (
                                    <h3 className="panel-title" style={{ margin: '0' }}>{user.username}</h3>
                                ) : (
                                    <h3 className="panel-title" style={{ margin: '0' }}>Loading...</h3>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #f5f5f5',
                                padding: '20px',
                            }}
                        >
                            <form className="form-horizontal">
                                <div className="panel panel-default">
                                    <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                        <h4 className="panel-title" style={{ margin: '0' }}>Profile User</h4>
                                    </div>
                                    <div style={{ borderBottom: '1px solid #f5f5f5', marginBottom: '10px' }}></div>
                                </div>
                                {user ? (
                                    <div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title">Email</h4>
                                            </div>
                                            <div className="panel-body">
                                                {user.email}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title">Role</h4>
                                            </div>
                                            <div className="panel-body">
                                                {user.role}
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
                                    </div>
                                ) : (
                                    <p>Loading user information...</p>
                                )}
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

                                <br />
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <Button type="submit" className="btn btn-primary">Submit</Button>

                                        <Button type="reset" className="btn btn-default">Cancel</Button>
                                    </div>
                                </div>

                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Info;
