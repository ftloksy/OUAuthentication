/**
 * It is a React component that allows users 
 * to select divisions and add them to a group. 
 * The component first fetches a list of divisions from the server. 
 * When the user selects a division, 
 * the component adds it to the group. 
 * The component also allows users to delete divisions from the group. 
 * When the user clicks the "Confirm" button, 
 * the component passes the selected divisions to the parent component.
 */
import React, { Component } from 'react';
import DivSelecter from './DivSelecter';
import DivName from './DivName';

class SetDivGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divChoice: []
    };
    this.getDivisions = this.getDivisions.bind(this);
    this.deleteCurrectDiv = this.deleteCurrectDiv.bind(this);
    this.setDivGroup = this.setDivGroup.bind(this);
  };

  // Show the selected ou and div form parent component.
  componentDidMount() {
    if ( this.props.selectedoudiv ) {
      this.setState({divChoice: this.props.selectedoudiv});
    } 
  }

  getDivisions(dv) {
    let tmpDivChoice = this.state.divChoice ;
    if ( tmpDivChoice.indexOf(dv) === -1 ) {
      tmpDivChoice.push(dv);
    }
    this.setState({divChoice: tmpDivChoice});
  }

  deleteCurrectDiv(event, dv){
    event.preventDefault();
    let tmpDivChoice = this.state.divChoice;
    let divIndex = tmpDivChoice.indexOf(dv);
    if (divIndex !== -1) {
      tmpDivChoice.splice(divIndex, 1);
    }
    this.setState({divChoice: tmpDivChoice})
  }

  setDivGroup(){
    this.props.onSetDivGroup(this.state.divChoice);
  }

  render() {
      const divChoice  = this.state.divChoice ;
      return (
          <div id="setoudiv">
          <DivSelecter onSubmit={(selectDiv) => this.getDivisions(selectDiv)}/>
          {divChoice.map(dv => (
            <div>
            <DivName divid={dv}/><button onClick={(event) => this.deleteCurrectDiv(event, dv)}>Del</button>
            </div>
          ))}
          <button onClick={this.setDivGroup}>Confirm</button>
          </div>
      );
  }
}

export default SetDivGroup;
