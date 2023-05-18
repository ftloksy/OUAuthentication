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
        event.preventDefault();
        const { name, value } = event.target;
        this.setState( { [name]: value } );
    }

    handleInputSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {

        const {
            loginname, password, email,
            telephone, address, firstname, lastname } = this.state;
        
        const textFields = [
                {
                    name: 'loginname',
                    ref: loginname
                }, 
                {
                    name: 'password',
                    ref: password
                }, 
                {
                    name: 'email',
                    ref: email
                },
                {
                    name: 'telephone',
                    ref: telephone
                }, 
                {
                    name: 'address',
                    ref: address
                }, 
                {
                    name: 'firstname',
                    ref: firstname
                },
                {
                    name: 'lastname',
                    ref: lastname
                }]

        return (
                <form onSubmit={(event) => this.handleInputSubmit(event)}>
                    <h1>Employees Registration Form</h1>

                    {textFields.map(field => (
                        <>
                            <label for={field.name}>{field.name.toUpperCase()}: </label>
                            <input type="text"
                                id={field.name}
                                name={field.name}
                                value={field.ref}
                                onChange={(event) => this.handleInputChange(event)}/><br/>
                        </>
                    ))}

                    <input type="submit" value="add Employees" />
                </form>
        )
    }
  
}

export default EmpRegForm;
