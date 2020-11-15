import React, { useContext, createContext, useState } from "react";
import {navigate} from "hookrouter";


/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

const authContext = createContext(null);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);


    const signIn = (login, password) => {
        if(login === "admin" && password === "admin"){
            setUser(login);
            navigate("/protected");
        }
        else
            alert("Invalid creds")
        return;
    };

    const signUp = (login, password, password2) => {
        if(password !== password2)
            alert("Passwords don't match");
        else signIn(login,password);
        return;
    };

    const signOut = () => {
        if(user !== null)
            setUser(null);
        return;
    };
    return {
        user,
        signIn,
        signOut,
        signUp
    };
}


/*

function SignOutButton() {
    //let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth.signout(() => history.push("/")
                    );
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


 */


