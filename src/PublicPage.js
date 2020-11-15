import React from "react";
import {Box} from "@material-ui/core";
import {useStyles} from "./App";

export function PublicPage() {
    const classes = useStyles();
    return (
        <Box display='flex' justifyContent="center" className={classes.input_form}>
            <h3 className={classes.text}>Public</h3>
        </Box>);
}

