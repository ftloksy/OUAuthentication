/**
 * This is a components. It is a button and User click
 * this button will stroage the random value to local Stroage.  
 */ 

import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import ListEmployees from './ListEmployees';

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
            userrole: "",
            errorMessage: "",
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
                    console.log('has Token localStorage and Data ( Test 2 ): ', data);
                    await this.setState({
                        logined: true,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        userrole: data.userrole,
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
                console.log("Data: ", data) // Notice: Token has not userrole value. Please modify about it.
                await this.setState({
                    logined: true,
                    token: data.token,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    userrole: data.userrole,
                    errorMessage: "",
                })
            } else {
                console.log("Error Status: ", response.status);
                const data = await response.json();
                console.log("Error Message: ", data.msg);
                await this.setState({
                    errorMessage: data.msg
                })
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }
    }

    async handleInputSubmit(event) {
        event.preventDefault();
        const { login, password } = this.state;
        await this.storageToken(login, password);
    }

    async handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        if ( name === "passwd" ) {
            await this.setState({password: value});
        } else if ( name === "login" ) {
            await this.setState({login: value});
        }
    }

    async logoutAndForgetToken(event){
        event.preventDefault();
        localStorage.removeItem("token");
        await this.setState({
            logined: false,
            login: "",
            password: "",
            token: "",
            firstname: "",
            lastname: "",
            userrole: "",
            errorMessage: "",
        })
    }

    render() {
        const { login, password, userrole, listEmpComponent,
            firstname, lastname, logined, errorMessage } = this.state;

        return (
            <>
            { errorMessage
            ? ( <h3>{errorMessage}</h3> )
            : ( <></> )
            }
            {logined 
            ? ( <>
                    <h1>Welcome: {firstname}, {lastname} ( {userrole} )</h1>
                    <button onClick={this.logoutAndForgetToken}>Logout</button>
                    <hr/>
                    <ListEmployees />
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
