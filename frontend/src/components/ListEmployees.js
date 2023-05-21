import React, { Component } from 'react';
import CreateEmployee from './CreateEmployee'

class OuDivName extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        emps: [],
        empId: "",
        displayForm: false
    };
    this.disableForm = this.disableForm.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchNames = this.fetchNames.bind(this);
  };

  componentDidMount() {
    this.fetchNames();
  }

  async fetchNames() {

    const token = localStorage.getItem('token');
    if ( token ) {
        console.log("Storaged Token: ", token);

        try {
            const response = await fetch("/login/getemps/" + this.props.choiceddiv, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('List emps Data: ', data);
                await this.setState( { emps: data })
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (err) {
            console.log("Error : ", err.message);
        }
    } else {
        console.log("Don't has any token.");
    }
  }

  async handleButtonClick(event, empId) {
    event.preventDefault();
    console.log("Employees Id: ", empId);
    await this.setState({empId, displayForm: true});
  }

  async disableForm() {
    await this.setState({displayForm: false})
  }

  render() {
    
        const { emps, empId, displayForm } = this.state ;

        return (
            <>
                {displayForm
                ? ( <CreateEmployee 
                      onUpdateEmpList={this.fetchNames} 
                      empId={empId} onDisableForm={this.disableForm} /> )
                : ( <ul>
                        {emps.map ( emp => (
                         <>
                            <li>{emp._id}: {emp.firstname}, {emp.lastname}
                                <button onClick={(event) => this.handleButtonClick(event, emp._id)}>Update</button>
                            </li>
                            </>
                        ))}
                        <li>
                            <button onClick={(event) => this.handleButtonClick(event, "")}>
                              Create a New Employees
                            </button>
                        </li>
                    </ul> )
                }
            </>
        );
  }
}

export default OuDivName;
