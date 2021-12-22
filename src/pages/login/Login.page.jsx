import { Button, Checkbox, FormControlLabel, Link, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { InputEmail } from '../../components/input/InputEmail.component';
import { InputPassword } from '../../components/input/InputPassword.component';
import { FrameMotionBox } from '../../components/motion/Motion.component';
import { createActionUpdate, LoginContext, LoginProvider } from './Login.context';

function Login({ drawerWidth, drawerOpen }) {
    return (
        <FrameMotionBox
            sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignContent: 'center',

                ml: drawerWidth + 'px',
                height: '100vh',
                p: 5,
                backgroundImage: "url(http://localhost:3000/img/register-bg1.jpg)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'darken',
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
            layout
            transition={{
                duration: 0.2,
                type: 'tween'
            }}
        >
            <LoginProvider>
                <FrameMotionBox
                    sx={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 300,
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 3,
                        maxWidth: '40vw',
                        height: '75vh',
                        p: 6
                    }}
                    layout
                    transition={{
                        duration: 0.2,
                        type: 'tween'
                    }}
                    from={{
                        opacity: 0
                    }}
                    to={{
                        opacity: 1
                    }}
                    withoutMotionInView
                >
                    <Typography
                        variant='h4'
                        sx={{
                            width: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        Login
                    </Typography>
                    <InputEmail fullWidth context={LoginContext} actionUpdate={createActionUpdate} />
                    <InputPassword fullWidth disableValidator context={LoginContext} actionUpdate={createActionUpdate} />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                            flexBasis: '100%',
                            margin: 'auto 0'
                        }}
                    >
                        <InputRemember />
                        <Link href='#' sx={{
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            lineHeight: 'normal',
                            textAlign: 'center'
                        }}>I forgot my password</Link>
                    </Stack>
                    <ButtonLogin />
                </FrameMotionBox>
            </LoginProvider>
        </FrameMotionBox>
    );
}

function ButtonLogin() {
    const { data } = useContext(LoginContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <Button
            type='submit'
            variant='contained'
            sx={{
                height: '2rem',
                px: 10,
                py: 2.5,
            }}
            onClick={handleSubmit}
        >Submit</Button>
    );
}

function InputRemember() {
    const { data: { remember: { value } }, dispatch } = useContext(LoginContext);
    const handleCheckRemember = (e) => {
        dispatch(createActionUpdate('remember', e.target.checked));
    }
    return (
        <FormControlLabel
            control={<Checkbox onChange={handleCheckRemember} value={value} />}
            label={<Typography component="span" variant='body2' sx={{ lineHeight: 'normal' }}>Remember</Typography>}
        />
    );
}

export default Login;
