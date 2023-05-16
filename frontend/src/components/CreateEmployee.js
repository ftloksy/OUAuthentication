import React, { Component } from 'react';
import OuDivDisplay from './OuDivDisplay';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitsDivChoice: []
    };
    this.getOrgUnitsDivisions = this.getOrgUnitsDivisions.bind(this);
    this.deleteCurrectOuDiv = this.deleteCurrectOuDiv.bind(this);
  };

  componentDidMount() {
    this.setState({orgUnitsDivChoice: []});
  }


  getOrgUnitsDivisions(oudiv) {
    alert("Click Submit! Report by Parent." + oudiv );
    let tmpOrgUnitsDivChoice = this.state.orgUnitsDivChoice ;
    if ( tmpOrgUnitsDivChoice.indexOf(oudiv) === -1 ) {
      tmpOrgUnitsDivChoice.push(oudiv);
    }
    this.setState({orgUnitsDivChoice: tmpOrgUnitsDivChoice});

  }

  deleteCurrectOuDiv(event, oudiv){
    event.preventDefault();
    //console.log("Delete Currect Ou Div: ");
    //console.log(oudiv);
    let tmpOrgUnitsDivChoice = this.state.orgUnitsDivChoice;
    let oudivIndex = tmpOrgUnitsDivChoice.indexOf(oudiv);
    if (oudivIndex != -1) {
      tmpOrgUnitsDivChoice.splice(oudivIndex, 1);
    }
    this.setState({orgUnitsDivChoice: tmpOrgUnitsDivChoice})
  }

  render() {
      const orgUnitsDivChoice  = this.state.orgUnitsDivChoice ;
      return (
          <div id="setoudiv">
          {orgUnitsDivChoice.map(oudiv => (
            <div>
            <span>{oudiv}</span><button onClick={(event) => this.deleteCurrectOuDiv(event, oudiv)}>Del</button>
            </div>
          ))}
          <OuDivDisplay onSubmit={(oudiv) => this.getOrgUnitsDivisions(oudiv)}/>
          </div>
      );
  }
}

export default CreateEmployee;