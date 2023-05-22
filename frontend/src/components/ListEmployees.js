import React, { Component } from 'react';
import CreateEmployee from './CreateEmployee';
import DivName from './DivName';
import '../css/ListEmployees.css';

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

  };

  componentDidMount() {
     this.fetchNames(this.props.choiceddiv);
  }

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
                    console.log('List emps Data in ListEmployees: ', data);
                    await this.setState( { emps: data })
                } else {
                    console.log('Fetch Names ListEmployees Error:', response.statusText);
                    console.log('Fetch Names ListEmployees Choiced Emp:', choicedDivId);
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

  render() {
    
        const { emps, empId, displayForm } = this.state ;
        const { choiceddiv } = this.props;
        const userRight = this.userRight ;

        return (
            <>
                {displayForm
                ? ( <CreateEmployee 
                      onUpdateEmpList={(choicedDiv) => this.fetchNames(choicedDiv)} 
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
