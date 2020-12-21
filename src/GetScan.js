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
    const [result, setResult] = useState("");
    const [headers, setHeaders] = useState("");



    const handleSubmit = event => {
        let url = "/api/scan/"+id;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    //setResult(JSON.stringify(result).substring(0,50));
                    setResult(result);
                    //console.log(JSON.stringify(result))
                    let heds = "";
                    for (let i = 0; i < result["issue_events"].length; i++) {
                        //heds+=(result["issue_events"][i]["issue"]["name"]);
                        heds+=(<ListItem button>
                                    <ListItemText primary={result["issue_events"][i]["issue"]["name"]}/>
                                </ListItem>
                        )
                    }
                    setHeaders(heds);
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
                {result["issue_events"].map((issue) => (
                    <ListItem button>
                        <ListItemText primary={issue["issue"]["name"]}/>
                    </ListItem>
                ))}

            </List>
        }
    </div>)

}



