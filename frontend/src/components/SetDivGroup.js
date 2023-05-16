import React, { Component } from 'react';
import DivSelecter from './DivSelecter';
//import DivName from './OuDivName';

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

  componentDidMount() {
    if ( this.props.selectedoudiv ) {
      console.log( this.props.selectedoudiv );
      this.setState({divChoice: this.props.selectedoudiv});
    } 
  }

  getDivisions(dv) {
    console.log("Dv in SetDivGroup: ");
    console.log(dv);
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
    console.log("In Set Ou Div Group.");
  }

  render() {
      const divChoice  = this.state.divChoice ;
      return (
          <div id="setoudiv">
          <DivSelecter onSubmit={(selectDiv) => this.getDivisions(selectDiv)}/>
          {divChoice.map(dv => (
            <div>
            <span>{dv}</span><button onClick={(event) => this.deleteCurrectDiv(event, dv)}>Del</button>
            </div>
          ))}
          <button onClick={this.setDivGroup}>Confirm</button>
          </div>
      );
  }
}

export default SetDivGroup;