/**
 * It is a React component 
 * that renders a form for registering employees. 
 * The form has seven fields: login name, password, email, 
 * telephone, address, first name, and last name. 
 * When the user submits the form, 
 * the component calls the onSelect() method of its parent component, 
 * passing in the values of the form fields.
 */
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
        this.setState(this.props.empinfo);
        await this.setState( { [name]: value } );
        this.props.onSelect(this.state);
    }

    render() {

        const { empinfo } = this.props;
        
        const textFields = [
                {
                    name: 'loginname',
                    ref: empinfo.loginname
                }, 
                {
                    name: 'password',
                    ref: empinfo.password
                }, 
                {
                    name: 'email',
                    ref: empinfo.email
                },
                {
                    name: 'telephone',
                    ref: empinfo.telephone
                }, 
                {
                    name: 'address',
                    ref: empinfo.address
                }, 
                {
                    name: 'firstname',
                    ref: empinfo.firstname
                },
                {
                    name: 'lastname',
                    ref: empinfo.lastname
                }]

        return (
            <div className="EmpRegInput">
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
            </div>
        )
    }
}

export default EmpRegForm;
