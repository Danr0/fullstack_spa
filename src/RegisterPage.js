import React, {useState} from "react";
import {useAuth} from "./auth";
import {Button, FormControl, IconButton, Slide, TextField} from "@material-ui/core";
import {A} from "hookrouter";
import {Alert} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import {useStyles} from "./style";


export function RegisterPage() {
    const [loginForm, setLogin] = useState("");
    const [passwordForm, setPassword] = useState("");
    const [passwordConfirmForm, setPasswordConfirm] = useState("");
    const [err,setErr] = useState(0);
    let auth = useAuth();
    const classes = useStyles();

    function alertForm() {
        let r = '';
        if(err === 1)
            r = 'All fields are required!';
        if(err === 2)
            r = 'Passwords don\'t match';
        return (
            <div className="alert">
                <Slide direction="up" in={err>0} mountOnEnter unmountOnExit>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErr(0);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {r}
                    </Alert>
                </Slide>
            </div>
        )
    }

    function validateForm() {
        if(!(loginForm.length > 0 && passwordForm.length > 0))
            return 1;
        if(!(passwordForm === passwordConfirmForm))
            return 2;
        return 0;
    }

    function handleSubmit(event) {
        if(validateForm() > 0){
            setErr(validateForm());
        }
        else {
            auth.signUp(loginForm, passwordForm, passwordConfirmForm);
            event.preventDefault();
        }
    }

    return (<FormControl className={classes.input_form}>
        <h1 className={classes.text}>Register</h1>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="Username" type="text" placeholder="Username" label="Username" variant="outlined" onChange={e => {
            setLogin(e.target.value)
        }}/>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="Password" type="password" placeholder="Password" label="Password" variant="outlined" onChange={e => {
            setPassword(e.target.value)
        }}/>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="PasswordConfirm" type="password" placeholder="Password" label="PasswordConfirm" variant="outlined" onChange={e => {
            setPasswordConfirm(e.target.value)
        }}/>

        <Button className={classes.button} onClick={handleSubmit}>LOG IN</Button>

        {err > 0 && alertForm()}

    </FormControl>)
}
