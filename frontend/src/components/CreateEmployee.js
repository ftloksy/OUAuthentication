import React, { Component } from 'react';
import SetOuDivGroup from './SetOuDivGroup';
import SetDivGroup from './SetDivGroup';
import OuDivName from './OuDivName';
import DivName from './DivName';
import UserRoleSelecter from './UserRoleSelecter';
import EmpRegForm from './EmpRegForm';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitDivsGroup: [],
      orgUnitDivsSelect: false,
      divsGroup: [],
      userRole: "",
      employeesInfo: {},
      divsSelect: false
    };
    this.ouDivGroup = this.ouDivGroup.bind(this);
    this.setOuDivsSelect = this.setOuDivsSelect.bind(this);

    this.divGroup = this.divGroup.bind(this);
    this.setDivsSelect = this.setDivsSelect.bind(this);

    this.setUserRole = this.setUserRole.bind(this);
    this.setEmployeesInfo = this.setEmployeesInfo.bind(this);
  };

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

  render() {
      const { orgUnitDivsGroup, orgUnitDivsSelect, 
        divsGroup, divsSelect, userRole, employeesInfo }  = this.state ;

      return (
        <>
          <ul>
            <li>Name: {employeesInfo.firstname}, {employeesInfo.lastname}</li>
            <li>Email: {employeesInfo.email}</li>
            <li>Address: {employeesInfo.address}</li>
            <li>Telephone: {employeesInfo.telephone}</li>
            <li>Loginname: {employeesInfo.loginname}</li>
            <li>Lastname: {employeesInfo.lastname}</li>
            <li>password: {employeesInfo.password}</li>
            <li>user role: {userRole}</li>
            {orgUnitDivsGroup.map(ous => (
              <li>Org Units Divisions: {ous}</li>
            ))}
            {divsGroup.map(dvs => (
              <li>Divisions: {dvs}</li>
            ))}
          </ul>
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

            <UserRoleSelecter onSelect={(ur) => this.setUserRole(ur)} />
            <EmpRegForm onSelect={(emp) => this.setEmployeesInfo(emp)} />
          </div>
        </>
      );
  }
}

export default CreateEmployee;
