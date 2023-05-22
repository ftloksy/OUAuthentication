import React, { Component } from 'react';
import CreateEmployee from './CreateEmployee';
import DivName from './DivName';

class ListEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        emps: [],
        empId: "",
        displayForm: false,
    };
    this.disableForm = this.disableForm.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchNames = this.fetchNames.bind(this);
    this.showEmployeeInfo = this.showEmployeeInfo.bind(this);
    this.updateDivTitle = this.updateDivTitle.bind(this);
    this.updateSelfRegistration = this.updateSelfRegistration.bind(this);

    this.divName = React.createRef();

    this.userRight = {
      read: localStorage.getItem("can_read"),
      addnew: localStorage.getItem("can_addnew"),
      update: localStorage.getItem("can_update"),
      assign: localStorage.getItem("can_assign"),
      unassign: localStorage.getItem("can_unassign")
    }

    this.fetchNames();
  };

  // componentDidMount() {
  //   this.fetchNames();
  // }

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
    await this.setState({
        empId, displayForm: true});
  }

  async disableForm() {
    await this.setState({displayForm: false})
  }

  async updateSelfRegistration(empId) {
    await this.setState({
        empId, displayForm: true});
  }

  async updateDivTitle(urlEndPart) {
    if ( this.divName.current ) {
      await this.divName.current.fetchNames(urlEndPart);
    }
  }

  showEmployeeInfo (emp) {
    return (
      <ul>
        <li>Email: {emp.email}</li>
        <li>Address: {emp.address}</li>
        <li>Telephone: {emp.telephone}</li>
        
        <hr/>
      </ul>
    )
  }

  render() {
    
        const { emps, empId, displayForm } = this.state ;
        const { choiceddiv } = this.props;
        const userRight = this.userRight ;

        return (
            <>
                {displayForm
                ? ( <CreateEmployee 
                      onUpdateEmpList={this.fetchNames} 
                      empId={empId} onDisableForm={this.disableForm} /> )
                : ( 
                    <>

                      <h2><DivName divid={choiceddiv} ref={this.divName}/></h2>
                      <ul>
                        {emps.map ( emp => (
                         <>
                            <li>
                                {emp.firstname}, {emp.lastname} ( {emp.userrole.role} )
                                {
                                  userRight.assign === "true" 
                                  || userRight.unassign === "true" 
                                  || userRight.update === "true"
                                ? (<button onClick={(event) => this.handleButtonClick(event, emp._id)}>
                                      Update
                                    </button>)
                                : (<></>)
                                }
                                {this.showEmployeeInfo(emp)}
                            </li>
                            </>
                        ))}
                        {userRight.assign === "true" || userRight.unassign === "true"
                        ? (<li>
                            <button onClick={(event) => this.handleButtonClick(event, "")}>
                              Create a New Employees
                            </button>
                        </li>)
                        : (<></>)}
                      </ul>
                    </>)
                }
            </>
        );
    }
}

export default ListEmployees;
