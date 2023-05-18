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
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    async handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        await this.setState( { [name]: value } );
        this.props.onSelect(this.state);
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
            <>
                    <h2>Registration Employees Form: </h2>

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
            </>

        )
    }
  
}

export default EmpRegForm;
