import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <SignOutButton />

                    <Menu />

                    <Switch>
                        <Route path="/public">
                            <PublicPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <PrivateRoute path="/protected">
                            <ProtectedPage />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}


function Menu() {
    return <ul>
        <li>
            <Link to="/login">Login Page</Link>
        </li>
        <li>
            <Link to="/register">Register Page</Link>
        </li>
        <li>
            <Link to="/public">Public Page</Link>
        </li>
        <li>
            <Link to="/protected">Protected Page</Link>
        </li>
    </ul>
}





/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);


    const signin = (login, password) => {
        //alert(login+" "+password);
        if(login === "admin" && password === "admin")
            setUser(login);
        else
            alert("Invalid creds")
        return;
    };

    const signup = (login, password, password2) => {
        if(password !== password2)
            alert("Passwords don't match");
        else signin(login,password);
        return;
    };

    const signout = () => {
        if(user !== null)
            setUser(null);
        return;
    };
    return {
        user,
        signin,
        signout,
        signup
    };
}


function SignOutButton() {
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}



function LoginPage() {
    const [loginForm, setLogin] = useState("");
    const [passwordForm, setPassword] = useState("");
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };

    function validateForm() {
        return loginForm.length > 0 && passwordForm.length > 0;
    }

    function handleSubmit(event) {
        auth.signin(loginForm, passwordForm);
        event.preventDefault();
    }



    let text = "";
    if (from.pathname === "/protected")
        text = "You must log in to view the page at "+from.pathname;
        return (
            <div>
                <p>{text}</p>
                <div className="Login">
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="login" bsSize="large">
                            <FormLabel>Login</FormLabel>
                            <FormControl
                                autoFocus
                                type="login"
                                value={loginForm}
                                onChange={e => setLogin(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={passwordForm}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                        <Button block bsSize="large" disabled={!validateForm()} type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );

}


function RegisterPage() {
    const [loginForm, setLogin] = useState("");
    const [passwordForm, setPassword] = useState("");
    const [passwordConfirmForm, setPasswordConfirm] = useState("");
    let auth = useAuth();

    function validateForm() {
        return loginForm.length > 0 && passwordForm.length > 0 && passwordForm.length === passwordConfirmForm.length;
    }

    function handleSubmit(event) {
        auth.signup(loginForm, passwordForm, passwordConfirmForm);
        event.preventDefault();
    }

    return (
        <div>
            <div className="Register">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="register" bsSize="large">
                        <FormLabel>Login</FormLabel>
                        <FormControl
                            autoFocus
                            type="login"
                            value={loginForm}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={passwordForm}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="passwordConfirm" bsSize="large">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            value={passwordConfirmForm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );

}
