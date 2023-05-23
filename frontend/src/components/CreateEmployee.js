/**
 * It is a React component that renders a form for creating a new employee. 
 * The form has seven fields: 
 * login name, password, email, telephone, address, first name, and last name. 
 * When the user submits the form, 
 * the component calls the onCreateEmployee method of its parent component, 
 * passing in the values of the form fields. 
 * The parent component can then use these values to create a new employee.
 */
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';

import SetOuDivGroup from './SetOuDivGroup';
import SetDivGroup from './SetDivGroup';
import OuDivName from './OuDivName';
import DivName from './DivName';
import UserRoleSelecter from './UserRoleSelecter';
import EmpRegForm from './EmpRegForm';
import fetchEmployeeById from '../lib/fetchEmployeeById';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitDivsGroup: [],
      orgUnitDivsSelect: false,
      divsGroup: [],
      userRole: "",
      employeesInfo: {},
      divsSelect: false,
      errorMessage: ""
    };

    this.fetchEmp = new fetchEmployeeById(this.props.empId);

    this.ouDivGroup = this.ouDivGroup.bind(this);
    this.setOuDivsSelect = this.setOuDivsSelect.bind(this);

    this.divGroup = this.divGroup.bind(this);
    this.setDivsSelect = this.setDivsSelect.bind(this);

    this.setUserRole = this.setUserRole.bind(this);
    this.setEmployeesInfo = this.setEmployeesInfo.bind(this);

    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);

    this.token = localStorage.getItem('token');

    this.userRight = {
      read: localStorage.getItem("can_read"),
      addnew: localStorage.getItem("can_addnew"),
      update: localStorage.getItem("can_update"),
      assign: localStorage.getItem("can_assign"),
      unassign: localStorage.getItem("can_unassign")
    }

  };

  async componentDidMount() {
    const getEmpInfo = await this.fetchEmp.fetch();
    console.log("CreateEmployees componentDidMount", getEmpInfo);
    await this.setState(getEmpInfo);
  }

  ouDivGroup(oudivGroup) {
    this.setState({ orgUnitDivsGroup: oudivGroup });
    this.setOuDivsSelect();
  }

  divGroup(dGroup) {
    this.setState({ divsGroup: dGroup })
    this.setDivsSelect();
  }

  setOuDivsSelect() {
    const select = this.state.orgUnitDivsSelect ;
    this.setState({orgUnitDivsSelect: !select})
  }

  setDivsSelect() {
    const select = this.state.divsSelect ;
    this.setState({divsSelect: !select})
  }

  setUserRole(ur) {
    console.log("Chosed User Role: ", ur);
    this.setState({userRole: ur})
  }

  setEmployeesInfo(emp) {
    console.log("Chosed Employees Info: ", emp);
    this.setState({employeesInfo: emp})
  }

  async handleButtonSubmit(event) {
    event.preventDefault();
    //const token = localStorage.getItem('token');
    const token = this.token;
    const { empId } = this.props;
    
    const { orgUnitDivsGroup, 
      divsGroup, userRole, employeesInfo }  = this.state ;
      
    let url = ''
    let body = '';
    let method = '';

    /**
     * If haven't empId, it is a create action.
     * If have that, it is a update action. 
     */
    if (empId) {
      if (this.userRight.assign === "true" || this.userRight.unassign === "true") {

        /**
         * this (/login/reguse/) url is just for Admin, 
         * this endpoint can update and assign the employees.
         */
        url = '/login/reguser/' + empId;
      } else {

        /**
         * this (/login/updateemp/) url is for "Normal" and "Management", 
         * this endpoint just for update and cann't assign the employees
         * to OUs and Divisions.
         */
        url = '/login/updateemp/' + empId;
      }
      method = 'PATCH';
      const createEmpObj = {
        userrole: userRole,
        divs: divsGroup,
        oudivs: orgUnitDivsGroup,

        // Never change the loginname.

        /** 
         * use MD5 hash encrypt the password ( user entry ),
         * make sure don't pass clear text password
         * through the internet.
         */
        password: MD5(employeesInfo.password).toString(),
        email: employeesInfo.email,
        telephone: employeesInfo.telephone,
        address: employeesInfo.address,
        firstname: employeesInfo.firstname,
        lastname: employeesInfo.lastname
      };
      body = JSON.stringify(createEmpObj);
    } else {

      /**
       * If haven't empId, this is create employee action.
       * the endpoint is (/login/createuser)
       * need assign and unassign right.
       * 
       * Has bug, If admin add a exist login, express will hange.
       * next version need to debug it.
       */
      url = '/login/createuser';
      method = 'POST';
      const createEmpObj = {
        userrole: userRole,
        divs: divsGroup,
        oudivs: orgUnitDivsGroup,
        loginname: employeesInfo.loginname,
        password: MD5(employeesInfo.password).toString(),
        email: employeesInfo.email,
        telephone: employeesInfo.telephone,
        address: employeesInfo.address,
        firstname: employeesInfo.firstname,
        lastname: employeesInfo.lastname
      };
      body = JSON.stringify(createEmpObj);
    }

    fetch(url, {
      method,

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body
    }).then(response => {

      if (!response.ok) {
        throw Error(response.statusText);
      };

      response.json().then( data => {
        if (!empId) {
          this.props.onUpdateEmpId(data.id);
        }
        console.log('Update or Create Data: ', data);
      });

    }).catch (err => {
      console.log("Error When Create User: ", err);
    })
      
    this.props.onUpdateEmpList(divsGroup[0]);
    // Cannot use this way to change Divisions label.
    // this.props.onUpdateDivLabel(divsGroup[0]);
    this.props.onDisableForm();
  }

  // when Select OU and Divisions information need user assign and unassign right.
  render() {
      const { orgUnitDivsGroup, orgUnitDivsSelect, 
        divsGroup, divsSelect, userRole, employeesInfo, errorMessage }  = this.state ;
      const userRight = this.userRight ;

      return (
        <>
          {/* Show the Employee base information.*/}
          <ul>
            <li>Name: {employeesInfo.firstname}, {employeesInfo.lastname}</li>
            <li>Email: {employeesInfo.email}</li>
            <li>Address: {employeesInfo.address}</li>
            <li>Telephone: {employeesInfo.telephone}</li>
          </ul>

          {errorMessage
          ? (<h2>{errorMessage}</h2>)
          : <></> }

          {/* assign and unassign employee to OU and Divisions need right. */}
          {userRight.assign === "true" || userRight.unassign === "true"
          ? ( <>
            <div id="showoudivgroup">
              <h2>Set Organisational Units / Divisions: </h2>
              {orgUnitDivsSelect
                ? <SetOuDivGroup 
                    onSetDivGroup={(oudivGroup) => this.ouDivGroup(oudivGroup)}
                    selectedoudiv={orgUnitDivsGroup}
                  />
                : <> 
                {orgUnitDivsGroup.map(oudiv => (
                  <div>
                    <OuDivName oudivid={oudiv}/>
                  </div>
                ))}
                <br/>
                <button onClick={this.setOuDivsSelect}>Update</button>
                <hr/>
              </>
              }
            </div>
  
            <div id="showdivgroup">
              <h2>Set Divisions: </h2>
              {divsSelect
                ? <SetDivGroup 
                    onSetDivGroup={(dGroup) => this.divGroup(dGroup)}
                    selectedoudiv={divsGroup}
                  />
                : <> 
                {divsGroup.map(dv => (
                  <div>
                    <DivName divid={dv} />
                  </div>
                ))}
                <br/>
                <button onClick={this.setDivsSelect}>Update</button>
                <hr/>
              </>
              }
            </div>
              <UserRoleSelecter urid={userRole} onSelect={(ur) => this.setUserRole(ur)} />
            <hr/>
          </>)
          : (<></>) }
          
          {/**  
            Show the base profile entry form. 
            Every employees can show this parts.
          */}
          <EmpRegForm empinfo={employeesInfo} onSelect={(emp) => this.setEmployeesInfo(emp)} />
          <hr/>
          <button onClick={this.handleButtonSubmit}>Create or Update Employee Account</button>

        </>
      );
  }
}

export default CreateEmployee;
