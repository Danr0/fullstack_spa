import React from "react";
import {useAuth} from "./auth";
import {A} from 'hookrouter';
import { Box } from "@material-ui/core";
import {useStyles} from "./style";


export function ProtectedPage() {
    let auth = useAuth();
    const classes = useStyles();

    return (<Box display='flex' justifyContent="center" className={classes.input_form}>
        {auth.user ? (
            <h3 className={classes.text}>Protected</h3>
        ) : (
            <h2 className={classes.text_style}> You need <A href="/login">login in</A> </h2>)}
            </Box>)
}

