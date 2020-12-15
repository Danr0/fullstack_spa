import React, {useEffect, useState} from "react";
import {useAuth} from "./auth";
import {A} from 'hookrouter';
import {Button, TextField, FormControl, Collapse, IconButton, Slide, Box} from '@material-ui/core';
import { Alert, AlertTitle,  } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import {useStyles} from "./style";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";


export function GetScan() {


    const classes = useStyles();

    const [id, setId] = useState("");
    const [result, setResult] = useState("")



    const handleSubmit = event => {
        let url = "/api/scan/"+id;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setResult(JSON.stringify(result).substring(0,50));
                },
                (error) => {
                    setResult("")
                }
            )

        event.preventDefault();
    }

    return (<div><FormControl className={classes.input_form}>
        <h1 className={classes.text}>Get scan</h1>

        <TextField className={classes.input} InputProps={{className: classes.input}} name="id" type="text" placeholder="Id" label="Id" variant="outlined" onChange={e => {
            setId(e.target.value)
        }}/>

        <Button className={classes.button} onClick={handleSubmit}>Get Scan</Button>
    </FormControl>
        { result!=="" &&
            <List component="nav" className={classes.list_item} aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary={result}/>
                </ListItem>
                <Divider/>
            </List>
        }
    </div>)

}



