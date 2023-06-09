/**
 * This is a components. It is a button and User click
 * this button will stroage the random value to local Stroage.  
 */ 

import React, { Component } from 'react';
import ListEmployees from './ListEmployees';
import DivName from './DivName';
import FetchDivisions from '../lib/FetchDivisions';
import '../css/OuLogin.css';

class OuLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            token: "",
            logined: false,
            choicedDiv: "",
            firstname: "",
            lastname: "",
            userrole: "",
            selfEmpId: "",
            read: false,
            addnew: false,
            update: false,
            assign: false,
            unassign: false,
            divisions: [],
            allDivisions: [],
            errorMessage: "",
        };
        this.storageToken = this.storageToken.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logoutAndForgetToken = this.logoutAndForgetToken.bind(this);
        this.choiceDivListEmps = this.choiceDivListEmps.bind(this);
        this.updateSelfRegistrationInfo = this.updateSelfRegistrationInfo.bind(this);

        this.listEmployees = React.createRef();

    };

    /* when mount that components, check storaged token */
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
                        selfEmpId: data.id,
                        divisions: data.divisions,
                        choicedDiv: data.divisions[0],
                        read: data.read,
                        addnew: data.addnew,
                        update: data.update,
                        assign: data.assign,
                        unassign: data.unassign,
                        errorMessage: "",
                    })
                    await this.choiceDivListEmps(null, data.divisions[0]);

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

    /* when user is Admin, fetch all Divisions */
    async fetchDivs() {
        const divsPool = new FetchDivisions();
        const allDivisions = await divsPool.fetch();

        await this.setState({ allDivisions });
    }

    /**
     * User input password and login name to auth
     * If auth success, storage the token in localstorage.
     */
    async storageToken(login, password) {
        console.log("login: " + login);
        console.log("Password: " + password);
        //const md5HashedPassword = MD5(password).toString();
        try {
            const response = await fetch('/login/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({password: md5HashedPassword, login})
                body: JSON.stringify({password, login})
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("can_read", data.read);
                localStorage.setItem("can_addnew", data.addnew);
                localStorage.setItem("can_update", data.update);
                localStorage.setItem("can_assign", data.assign);
                localStorage.setItem("can_unassign", data.unassign);
                console.log("Token : ", data.token);
                console.log("Data: ", data) // Notice: Token has not userrole value. Please modify about it.
                await this.setState({
                    logined: true,
                    token: data.token,
                    selfEmpId: data.id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    userrole: data.userrole,
                    choicedDiv: data.divisions[0],
                    divisions: data.divisions,
                    read: data.read,
                    addnew: data.addnew,
                    update: data.update,
                    assign: data.assign,
                    unassign: data.unassign,
                    errorMessage: "",
                })
                await this.choiceDivListEmps(null, data.divisions[0]);

            } else {
                console.log("Error Status: ", response.status);
                const data = await response.json();
                await this.setState({
                    errorMessage: data.msg
                })
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }

        await this.fetchDivs();
    }

    // enter password and login, and check token / storage token.
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

    // If the use logout, clear the localstorage and state
    async logoutAndForgetToken(event){
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("can_read");
        localStorage.removeItem("can_addnew");
        localStorage.removeItem("can_update");
        localStorage.removeItem("can_assign");
        localStorage.removeItem("can_unassign");
        await this.setState({
            logined: false,
            selfEmpId: "",
            login: "",
            password: "",
            token: "",
            firstname: "",
            lastname: "",
            userrole: "",
            read: false,
            addnew: false,
            update: false,
            assign: false,
            unassign: false,
            divisions: [],
            errorMessage: "",
        })
    }

    /**
     * When the web client click the divisions buttons list.
     * Will target this function. and update the child component ListEmployees
     * refetch the display division's employees list.
     * and close the update and create employee form.
     * and update the divisions label's label.
     */
    async choiceDivListEmps(event, dv) {
        console.log("chiceDivListEmp: ", dv);
        if ( this.listEmployees.current ) {
           await this.listEmployees.current.fetchNames(dv);
           await this.listEmployees.current.disableForm();    
           await this.listEmployees.current.updateDivTitle(dv);
        };
        await this.setState({
            choicedDiv: dv
        })
    }

    // When use click the profile update button, will enable the update form in ListEmployees.
    async updateSelfRegistrationInfo(event, empId) {
        if ( this.listEmployees.current ) {
           await this.listEmployees.current.updateSelfRegistration(empId);
           await this.listEmployees.current.enableForm();
        };
    }

    render() {
        const { login, password, userrole, divisions, 
            selfEmpId, assign, unassign, allDivisions,
            choicedDiv, firstname, lastname, logined, errorMessage } = this.state;

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
                    <h2>Update Your Self Registration Info.</h2>
                    <button onClick={(event) => this.updateSelfRegistrationInfo(event, selfEmpId)}>Update</button>
                    <hr/>
                    <div className='divisionslist'>
                        <div>
                            <h2>Divisions:</h2>
                            { assign || unassign
                            ? (<ul>
                                {allDivisions.map(dv => (
                                    <li>
                                        <button onClick={event => this.choiceDivListEmps(event, dv._id)}>
                                            <DivName divid={dv._id} />
                                        </button>
                                    </li>
                                ))}
                            </ul>)
                            : (<ul>
                                {divisions.map(dv => (
                                    <li>
                                        <button onClick={event => this.choiceDivListEmps(event, dv)}>
                                            <DivName divid={dv} />
                                        </button>
                                    </li>
                                ))}
                            </ul>) }
                        </div>
                        <div>
                            <ListEmployees 
                                selfempid={selfEmpId}
                                choiceddiv={choicedDiv}
                                ref={this.listEmployees} />
                        </div>
                    </div>
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
