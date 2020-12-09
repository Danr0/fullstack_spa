import {A, navigate} from "hookrouter";
import React from "react";
import {useAuth} from "./auth";
import {Button, Menu, MenuItem, Box, List, ListItem} from '@material-ui/core';
import {useStyles} from "./style";

function SignOutButton() {
    let auth = useAuth();
    const classes = useStyles();

    return auth.user ? (
        <Box display="flex" >
            Welcome { auth.user }!
            <button className={classes.button}
                onClick={() => {
                    auth.signOut(null//() => history.push("/"))
                    );
                }}
            >
                Sign out
            </button>
        </Box>
    ) : (
        <button className={classes.button} onClick={() => navigate('/login')}>Log In</button>
    );
}


export function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<div>
            <Box display="flex" p={1} >
                <Box p={1} flexGrow={1} bgcolor="orange">
                    <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.button} onClick={handleClick}>
                        Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><A href="/">Main Page</A></MenuItem>
                        <MenuItem onClick={handleClose}><A href="/login">Login Page</A></MenuItem>
                        <MenuItem onClick={handleClose}><A href="/register">Register Page</A></MenuItem>
                        <MenuItem onClick={handleClose}><A href="/public">Public Page</A></MenuItem>
                        <MenuItem onClick={handleClose}><A href="/protected">Protected Page</A></MenuItem>
                        <MenuItem onClick={handleClose}><A href="/scan">Scan Setup</A></MenuItem>
                    </Menu>
                </Box>
                <Box p={1} bgcolor="orange">
                    <SignOutButton />
                </Box>
            </Box>
    </div>
    );
}
