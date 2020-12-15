import {A, useRoutes} from 'hookrouter';
import React from "react";
import {LoginPage} from "./LoginPage";
import {NotFoundPage} from "./NotFoundPage";
import {RegisterPage} from "./RegisterPage";
import {PublicPage} from "./PublicPage";
import {ProtectedPage} from "./ProtectedPage";
import {ProvideAuth} from "./auth";
import {MainPage} from "./MainPage";
import {SimpleMenu} from "./Menu";
import {ScanSetup} from "./ScanSetup";
import {GetScan} from "./GetScan";
import { useStyles} from "./style";
import { Box } from "@material-ui/core";
//import "./App.css"





const routes = {
  '/': () => <MainPage />,
  '/login': () =>  <LoginPage />,
  '/register': () => <RegisterPage />,
  '/public': () => <PublicPage />,
  '/protected': () => <ProtectedPage />,
  '/scan': () => <ScanSetup />,
    '/scans': () => <GetScan />
};


//className={classes.main_page}>
function App() {
    const classes = useStyles();
    const routeResult = useRoutes(routes) || <NotFoundPage />;
    return (
        <Box className={classes.bg}>
            <ProvideAuth>
                <div className="App">
                        <SimpleMenu />
                    <Box display='flex' justifyContent="center" >
                        {routeResult}
                    </Box>
                </div>

            </ProvideAuth>
        </Box>);
}

export default App;
