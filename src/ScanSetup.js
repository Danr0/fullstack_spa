import React, {useEffect, useState} from "react";
import {useAuth} from "./auth";
import {A} from 'hookrouter';
import {Button, TextField, FormControl, Collapse, IconButton, Slide, Box} from '@material-ui/core';
import { Alert, AlertTitle,  } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import {useStyles} from "./style";

function ReqTo(url) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} {item.price}
                    </li>
                ))}
            </ul>
        );
    }
}


export function ScanSetup() {


    const classes = useStyles();

    const [values, setValues] = useState({ val: []});
    const [result, setResult] = useState("")

    function createInputs() {
        return values.val.map((el, i) =>
            <div key={i}>
                <input type="text" value={el||''} onChange={handleChange.bind(i)} />
                <input className={classes.button} type='button' value='remove' onClick={removeClick.bind(i)} />
            </div>
        );
    }

    function handleChange(event) {
        let vals = [...values.val];
        vals[this] = event.target.value;
        setValues({ val: vals });
    }

    const addClick = () => {
        setValues({ val: [...values.val, '']})
    }

    const removeClick = () => {
        let vals = [...values.val];
        vals.splice(this,1);
        setValues({ val: vals });
    }

    const handleSubmit = event => {
        fetch("/api/scan")
                .then(res => res.json())
                .then(
                    (result) => {
                        setResult(result);
                    },
                    (error) => {
                        setResult("")
                    }
                )

        event.preventDefault();
    }

    return (<div>
        <FormControl className={classes.input_form}>
            <h1 className={classes.text}>Scan</h1>
        <form onSubmit={handleSubmit}>
            {createInputs()}
            <input className={classes.button} type='button' value='add more' onClick={addClick} />
            <input className={classes.button} type="submit" value="Submit" />
        </form>
        </FormControl>
        {result.data}
        </div>);

}



