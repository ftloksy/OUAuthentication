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
      
    console.log("Submit button click.");


    let url = ''
    let jsonEmpObj = '';

    if (empId) {
      if (this.userRight.assign === "true" || this.userRight.unassign === "true") {
        url = '/login/reguser/' + empId;
      } else {
        url = '/login/updateemp/' + empId;
      }
      const createEmpObj = {
        userrole: userRole,
        divs: divsGroup,
        oudivs: orgUnitDivsGroup,

        // Never change the loginname.
        password: MD5(employeesInfo.password).toString(),
        email: employeesInfo.email,
        telephone: employeesInfo.telephone,
        address: employeesInfo.address,
        firstname: employeesInfo.firstname,
        lastname: employeesInfo.lastname
      };
      jsonEmpObj = JSON.stringify(createEmpObj);
    } else {
      url = '/login/createuser';
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
      jsonEmpObj = JSON.stringify(createEmpObj);
    }

    console.log("Url in CreateEmployee.")

    console.log("handleButtonSubmit JSON: ", jsonEmpObj);

    fetch(url, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: jsonEmpObj
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
    this.props.onDisableForm();
  }

  render() {
      const { orgUnitDivsGroup, orgUnitDivsSelect, 
        divsGroup, divsSelect, userRole, employeesInfo, errorMessage }  = this.state ;
      const userRight = this.userRight ;

      return (
        <>
          <ul>
            <li>Name: {employeesInfo.firstname}, {employeesInfo.lastname}</li>
            <li>Email: {employeesInfo.email}</li>
            <li>Address: {employeesInfo.address}</li>
            <li>Telephone: {employeesInfo.telephone}</li>
            {/* <li>Loginname: {employeesInfo.loginname}</li>
            <li>Lastname: {employeesInfo.lastname}</li>
            <li>password: {employeesInfo.password}</li>
            <li>user role: {userRole}</li>
            {orgUnitDivsGroup.map(ous => (
              <li>Org Units Divisions: <OuDivName oudivid={ous} /></li>
            ))}
            {divsGroup.map(dvs => (
              <li>Divisions: <DivName divid={dvs} /></li>
            ))} */}
          </ul>

          {errorMessage
          ? (<h2>{errorMessage}</h2>)
          : <></> }

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
          
          <EmpRegForm empinfo={employeesInfo} onSelect={(emp) => this.setEmployeesInfo(emp)} />
          <hr/>
          <button onClick={this.handleButtonSubmit}>Create Employee Account</button>

        </>
      );
  }
}

export default CreateEmployee;
