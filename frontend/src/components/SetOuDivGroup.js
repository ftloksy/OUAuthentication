/**
 * It is a React component that allows users to select organization units (OUs)
 * and divisions and add them to a group. 
 * The component first fetches a list of OUs and divisions from the server. 
 * When the user selects an OU or division, the component adds it to the group. 
 * The component also allows users to delete OUs and divisions from the group. 
 * When the user clicks the "Confirm" button, 
 * the component passes the selected OUs and divisions to the parent component.
 */
import React, { Component } from 'react';
import OuDivSelecter from './OuDivSelecter';
import OuDivName from './OuDivName';

class SetOuDivGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitsDivChoice: []
    };
    this.getOrgUnitsDivisions = this.getOrgUnitsDivisions.bind(this);
    this.deleteCurrectOuDiv = this.deleteCurrectOuDiv.bind(this);
    this.setOuDivGroup = this.setOuDivGroup.bind(this);
  };

  componentDidMount() {
    if ( this.props.selectedoudiv ) {
      this.setState({orgUnitsDivChoice: this.props.selectedoudiv});
    } 
  }

  getOrgUnitsDivisions(oudiv) {
    let tmpOrgUnitsDivChoice = this.state.orgUnitsDivChoice ;
    if ( tmpOrgUnitsDivChoice.indexOf(oudiv) === -1 ) {
      tmpOrgUnitsDivChoice.push(oudiv);
    }
    this.setState({orgUnitsDivChoice: tmpOrgUnitsDivChoice});

  }

  deleteCurrectOuDiv(event, oudiv){
    event.preventDefault();
    let tmpOrgUnitsDivChoice = this.state.orgUnitsDivChoice;
    let oudivIndex = tmpOrgUnitsDivChoice.indexOf(oudiv);
    if (oudivIndex !== -1) {
      tmpOrgUnitsDivChoice.splice(oudivIndex, 1);
    }
    this.setState({orgUnitsDivChoice: tmpOrgUnitsDivChoice})
  }

  // pass selected orgUnitsDiv choice to parent.
  setOuDivGroup(){
    this.props.onSetDivGroup(this.state.orgUnitsDivChoice);
  }

  render() {
      const orgUnitsDivChoice  = this.state.orgUnitsDivChoice ;
      return (
          <div id="setoudiv">
          <OuDivSelecter onSubmit={(oudiv) => this.getOrgUnitsDivisions(oudiv)}/>
          {orgUnitsDivChoice.map(oudiv => (
            <div>
            <OuDivName oudivid={oudiv}/><button onClick={(event) => this.deleteCurrectOuDiv(event, oudiv)}>Del</button>
            </div>
          ))}
          <button onClick={this.setOuDivGroup}>Confirm</button>
          </div>
      );
  }
}

export default SetOuDivGroup;
