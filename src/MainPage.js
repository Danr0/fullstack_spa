import React from "react";
import {useStyles} from "./style";
import {Box} from "@material-ui/core";

export function MainPage() {
    const classes = useStyles();
    return (
        <Box display='flex' justifyContent="center" className={classes.input_form}>
            <h3 className={classes.text}>Welcome</h3>
        </Box>);
}