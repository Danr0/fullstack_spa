import React, {useState} from "react";
import {useAuth} from "./auth";
import {A} from 'hookrouter';
import {Button, TextField, FormControl, Collapse, IconButton, Slide, Box} from '@material-ui/core';
import { Alert, AlertTitle,  } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import {useStyles} from "./style";


export function LoginPage() {
    const [loginForm, setLogin] = useState("");
    const [passwordForm, setPassword] = useState("");
    const [err,setErr] = useState(false);
    let auth = useAuth();
    const classes = useStyles();

    function alertForm() {
        return (
            <div className="alert">
                <Slide direction="up" in={err} display='flex'  mountOnEnter unmountOnExit>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErr(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Both fields are required!
                    </Alert>
                </Slide>
            </div>
        )
    }

    function validateForm() {
        return loginForm.length > 0 && passwordForm.length > 0;
    }

    function handleSubmit(event) {
        if (!validateForm()){
            setErr(true);
        }
        else {
            auth.signIn(loginForm, passwordForm);
            event.preventDefault();
        }
    }

    return (<FormControl className={classes.input_form}>
        <h1 className={classes.text}>Login</h1>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="Username" type="text" placeholder="Username" label="Username" variant="outlined" onChange={e => {
            setLogin(e.target.value)
        }}/>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="Password" type="password" placeholder="Password" label="Password" variant="outlined" onChange={e => {
            setPassword(e.target.value)
        }}/>

            <Button className={classes.button} onClick={handleSubmit}>LOG IN</Button>


        <div className="bottom_text">
            <p className={classes.text}>Don't have account?</p>
            <A className={classes.text} href="/register">Sign up</A>
        </div>

        {err > 0 && alertForm()}

    </FormControl>)


}
