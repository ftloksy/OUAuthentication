/**
 * This is a components. It is a button and User click
 * this button will stroage the random value to local Stroage.  
 */ 

import React, { Component } from 'react';
import { MD5 } from 'crypto-js';

class OuLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            token: "",
            logined: false,
            firstname: "",
            lastname: "",
            errorMessage: ""
        };
        this.storageToken = this.storageToken.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logoutAndForgetToken = this.logoutAndForgetToken.bind(this);
    };

    async componentDidMount() {
        const token = localStorage.getItem('token');
        if ( token ) {
            console.log("Storaged Token: ", token);

            try {
                const response = await fetch("/login/checktoken", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('has Token localStorage and Data: ', data);
                    this.setState({
                        logined: true,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        errorMessage: "",
                    })
                } else {
                    console.log('Error:', response.statusText);
                }

            } catch (err) {
                console.log("Error : ", err.message);
            }

        } else {
            console.log("Don't has any record.");
        }


    }

    async storageToken(login, password) {
        console.log("login: " + login);
        console.log("Password: " + password);
        const md5HashedPassword = MD5(password).toString();
        try {
            const response = await fetch('/login/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password: md5HashedPassword, login})
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                console.log("Token : ", data.token);
                console.log("Data: ", data)
                this.setState({
                    logined: true,
                    token: data.token,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    errorMessage: ""
                })
            } else {
                console.log("Error Status: ", response.status);
                const data = await response.json();
                console.log("Error Message: ", data.msg);
                this.setState({
                    errorMessage: data.msg
                })
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }
    }

    handleInputSubmit(event) {
        event.preventDefault();
        const { login, password } = this.state;
        this.storageToken(login, password);
    }

    handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        if ( name === "passwd" ) {
            this.setState({password: value});
        } else if ( name === "login" ) {
            this.setState({login: value});
        }
    }

    logoutAndForgetToken(event){
        event.preventDefault();
        localStorage.removeItem("token");
        this.setState({
            logined: false,
            login: "",
            password: "",
            token: "",
            firstname: "",
            lastname: "",
            errorMessage: ""
        })
    }

    render() {
        const { login, password, 
            firstname, lastname, logined, errorMessage } = this.state;

        return (
            <>
            { errorMessage
            ? ( <h3>{errorMessage}</h3> )
            : ( <></> )
            }
            {logined 
            ? ( <>
                    <h1>Welcome: {firstname}, {lastname}</h1>
                    <button onClick={this.logoutAndForgetToken}>Logout</button>
                </>)
            : ( <form onSubmit={(event) => this.handleInputSubmit(event)}>
                    <h2>Login</h2>
                    <label for="loginname">login: </label>
                    <input type="text"
                        id="loginname"
                        name="login"
                        value={login}
                        onChange={(event) => this.handleInputChange(event)}/><br/>
                    <label for="loginpasswd">Password: </label>
                    <input type="text" 
                        id="loginpasswd" 
                        name="passwd"
                        value={password}
                        onChange={(event) => this.handleInputChange(event)}/><br/>
                    <input type="submit" value="Login" />
                </form>)
            }
            </>
        )
    }
  
}

export default OuLogin;
