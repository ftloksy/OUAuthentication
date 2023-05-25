/**
 * It is a React component that renders a list of employees. 
 * The list is fetched from the server using the fetchNames() method. 
 * The user can update or delete an employee 
 * by clicking on the corresponding button. 
 * When the user clicks on the "Create a New Employees" button, 
 * a new form is opened where the user can enter the employee's information. 
 * When the user submits the form, the employee is created and added to the list.
 */
import React, { Component } from 'react';
import CreateEmployee from './CreateEmployee';
//import DivName from './DivName';
import FetchDivisionById from '../lib/FetchDivisionById';
import '../css/ListEmployees.css';

class ListEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        emps: [], // show employees at list.
        empId: "", // choiced employee to update or delete.
        deleteMessage: "", // when employee delete will update this msg.
        displayForm: false, // Display form for update and create employees.
        showNowDivTitle: ""
    };
    this.enableForm = this.enableForm.bind(this);
    this.disableForm = this.disableForm.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.fetchNames = this.fetchNames.bind(this);
    this.showEmployeeInfo = this.showEmployeeInfo.bind(this);
    this.updateDivTitle = this.updateDivTitle.bind(this);
    this.updateSelfRegistration = this.updateSelfRegistration.bind(this);
    this.showEmployeeInfo = this.showEmployeeInfo.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    
    this.divName = React.createRef();

    this.divByIdName = new FetchDivisionById();

    // Read token has the rights.
    this.userRight = {
      read: localStorage.getItem("can_read"),
      addnew: localStorage.getItem("can_addnew"),
      update: localStorage.getItem("can_update"),
      assign: localStorage.getItem("can_assign"),
      unassign: localStorage.getItem("can_unassign")
    }

  };

  async componentDidMount() {
     const { choiceddiv } = this.props;
     this.fetchNames(this.props.choiceddiv);
     const divTitle = await this.divByIdName.fetchDivById(choiceddiv);
     this.setState({ 
      showNowDivTitle: divTitle
     })
  }

  // fetch divisions's employees from choicedDivId.
  async fetchNames(choicedDivId) {
      
    this.fetchTimeout = setTimeout(async () => {

        const token = localStorage.getItem('token');
        if ( token ) {
            console.log("Storaged Token: ", token);
    
            try {
                const response = await fetch("/login/getemps/" + choicedDivId, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    await this.setState( { emps: data })
                } else {
                    console.log('Fetch Names ListEmployees Error:', response.statusText);
                }
            } catch (err) {
                console.log("Error : ", err.message);
            }
        } else {
            console.log("Don't has any token.");
        }
    }, 2000);

  }

  componentWillUnmount() {
    clearTimeout(this.fetchTimeout);
  }

  /**
   * hit the Update button.
   * will show the form to update the employee
   * profile.
   * 
   * param   empId :     this is choiced employee's id.
   */
  async handleUpdateButtonClick(event, empId) {
    event.preventDefault();
    await this.updateSelfRegistration(empId);
    await this.enableForm();
  }

  // Delete the employee, and update the employees list.
  async handleDeleteButtonClick(event, empId, loginname, choiceddiv) {
    event.preventDefault();
    await this.deleteEmployee(empId, loginname);
    await this.fetchNames(this.props.choiceddiv);
    await this.updateDivTitle(this.props.choiceddiv);
  }

  // Close the update and create employee form.
  async disableForm() {
    await this.setState({displayForm: false})
  }

  /**
   * Display the update and create employee form,
   * and clear the delete the last employee message.
   */
  async enableForm() {
    await this.setState({
      displayForm: true,
      deleteMessage: "",
    });
  }

  /**
   * When user click the botton to update self profile.
   * update the state's empId.
   */
  async updateSelfRegistration(empId) {
    await this.setState({ empId });
  }

  /**
   * When user click button to choice another divisions list.
   * then update the divisions label title. 
   * 
   * next time. I don't use components to handle it.
   */
  async updateDivTitle(urlEndPart) {
    const divTitle = await this.divByIdName.fetchDivById(urlEndPart);
    this.setState({ 
     showNowDivTitle: divTitle
    })
  }

  /**
   * high light the emp's entry. 
   * use JSX to show emps's information.
   */
  showEmployeeInfo (emp) {
    let highLight = "unhighLight";
    if ( emp._id === this.state.empId ) {
      highLight = "highLight";
    }

    return (
      <ul className={highLight}>
        <li>Email: {emp.email}</li>
        <li>Address: {emp.address}</li>
        <li>Telephone: {emp.telephone}</li>
        <li>User Role: {emp.userrole.role}</li>
        {emp.oudivs.map(ou => (
          <li>Org Units: {ou.orgunits.name} / Divisions: {ou.divisions.name} </li>
        ))}
        {emp.divs.map(dv => (
          <li>Divisions: {dv.name} </li>
        ))}
        <hr/>
      </ul>
    )
  }

  // When use click the delete button. will delete employee in database.
  async deleteEmployee(empId, loginname) {
    const token = localStorage.getItem('token');
    if ( token ) {
        console.log("Storaged Token: ", token);

        try {
            const response = await fetch("/login/deleteemp/" + empId, {
              method: 'DELETE',
              headers: {
                  Authorization: `Bearer ${token}`
              }
            });
            

            if (response.ok) {
                await this.setState({ deleteMessage: loginname + " record has deleted."})
            } else {
                console.log('Delete Emp in ListEmployees Error:', response.statusText);
            }
        } catch (err) {
            console.log("Delete Emp in ListEmployees in Try Error : ", err.message);
        }
    } else {
        console.log("Don't has any token.");
    }

  }

  

  render() {
    
        const { emps, empId, showNowDivTitle,
          displayForm, deleteMessage } = this.state ;
        const { choiceddiv } = this.props;
        const userRight = this.userRight ;

        return (
            <>
                {displayForm
                ? ( <CreateEmployee 
                      onUpdateEmpId={(empId) => this.updateSelfRegistration(empId)}
                      onUpdateEmpList={async (choicedDiv) => await this.fetchNames(choicedDiv)} 
                      onUpdateDivLabel={(divid) => this.updateDivTitle(divid)}
                      empId={empId} onDisableForm={this.disableForm} /> )
                : ( 
                    <>

                      {deleteMessage
                      ? (<h2 className='careMessage'>{deleteMessage}</h2>)
                      : (<></>)
                      }

                      {/* when employees has assign or unassign right show the button  */}
                      {userRight.assign === "true" || userRight.unassign === "true"
                      ? (
                          <button onClick={(event) => this.handleUpdateButtonClick(event, "")}>
                            Create a New Employees
                          </button>
                      )
                      : (<></>)}

                      <h2>{showNowDivTitle}</h2>
                      <ul>
                        {emps.map ( emp => (
                         <>
                            <li>
                                {emp.firstname}, {emp.lastname} ( {emp.userrole.role} )

                                {/**  
                                  * when employees has assign or unassign right show the button 
                                  * if employees has update right and the emp isn't Admin then show.
                                  */}
                                {
                                  userRight.assign === "true" 
                                  || userRight.unassign === "true" 
                                  || ( userRight.update === "true" && emp.userrole.role !== "Admin" )
                                ? (
                                
                                    <>
                                    <button onClick={(event) => this.handleUpdateButtonClick(event, emp._id)}>
                                      Update
                                    </button>

                                  {/* when employees has assign or unassign right show the button  */}

                                    {
                                      userRight.assign === "true" 
                                      || userRight.unassign === "true"
                                    ? (
                                        <button 
                                          onClick={
                                            (event) => this.handleDeleteButtonClick(
                                                event, emp._id, emp.loginname, emp.divs._id)
                                            }>
                                          Delete
                                        </button>
                                      ) 
                                    : (<></>)
                                    }

                                    </>
                                    
                                    )
                                : (<></>)
                                }
                                {this.showEmployeeInfo(emp)}
                            </li>
                            </>
                        ))}

                      </ul>
                    </>)
                }
            </>
        );
    }
}

export default ListEmployees;
