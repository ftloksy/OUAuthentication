import React, { Component } from 'react';

class EmpRegForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginname: "",
            password: "",
            email: "",
            telephone: "",
            address: "",
            firstname: "",
            lastname: ""           
        };
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    componentDidMount() {
    }

    handleInputChange(event) {
        const { name, id, value } = event.target;
        this.setState( { [name]: value } );
    }

    handleInputSubmit() {

    }

    render() {

        const {
            loginname, password, email,
            telephone, address, firstname, lastname } = this.state;

        return (
                <form onSubmit={(event) => this.handleInputSubmit(event)}>
                    <h1>Employees Registration Form</h1>

                    <label for="loginname">Loginname: </label>
                    <input type="text"
                        id="loginname"
                        name="loginname"
                        value={loginname}
                        onChange={(event) => this.handleInputChange(event)}/><br/>

                    <label for="loginpasswd">Password: </label>
                    <input type="text" 
                        id="loginpasswd" 
                        name="password"
                        value={password}
                        onChange={(event) => this.handleInputChange(event)}/><br/>

                    <label for="email">Email: </label>
                    <input type="text" 
                        id="email" 
                        name="email"
                        value={email}
                        onChange={(event) => this.handleInputChange(event)}/><br/>

                    <label for="telephone">Telephone: </label>
                    <input type="text" 
                        id="telephone" 
                        name="telephone"
                        value={telephone}
                        onChange={(event) => this.handleInputChange(event)}/><br/>

                    <label for="address">Address: </label>
                    <input type="text" 
                        id="address" 
                        name="address"
                        value={address}
                        onChange={(event) => this.handleInputChange(event)}/><br/>
                    
                    <label for="firstname">Firstname: </label>
                    <input type="text" 
                        id="firstname" 
                        name="firstname"
                        value={firstname}
                        onChange={(event) => this.handleInputChange(event)}/><br/>
                    
                    <label for="lastname">Lastname: </label>
                    <input type="text" 
                        id="lastname" 
                        name="lastname"
                        value={lastname}
                        onChange={(event) => this.handleInputChange(event)}/><br/>

                    <input type="submit" value="Login" />
                </form>
        )
    }
  
}

export default EmpRegForm;
