/**
 * It is a React component that allows users 
 * to select an organization unit (OU) and a division. 
 * The component first fetches a list of OUs from the server. 
 * When the user selects an OU, the component fetches 
 * a list of divisions for that OU. 
 * The user can then select a division. When the user submits the form, 
 * the component passes the selected OU and division to the parent component.
 */
import React, { Component } from 'react';

class OuDivSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitsPool: [],
      divisionsPool: [],
      choiceOuDiv: ''
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  componentDidMount() {
    this.fetchDiv();
  }

  async fetchDiv() {
    fetch('/login/getou')
    .then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      response.json().then( async OrgUnits => {
        let orgUnitsPool = [{_id: "", name: ""}];
        OrgUnits.forEach( ou => {
          orgUnitsPool.push(ou);
        })
        await this.setState( { orgUnitsPool } );
        console.log( orgUnitsPool );
      })
    })
  }

  handleInputSubmit(event) {
    event.preventDefault();
    const { choiceOuDiv } = this.state;
    console.log( "Choice Org Units & Divisions: ", choiceOuDiv );
    this.props.onSubmit( choiceOuDiv);
  }

  async handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    console.log("In OuDivSelecter Id: ", id)
    if ( name === "ou" && value ) {

      fetch('/login/getoudiv/' + value)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        response.json().then(async divisions => {
          let divisionsPool = [{ id: "", div: { name: "" }}];
          divisions.forEach((ouDiv) => {
            divisionsPool.push( { id: ouDiv._id, div: ouDiv.divisions } );
          })
          await this.setState({divisionsPool});
          console.log("OuDivSelecter handleInputChange: ", divisionsPool);
        })
      })
    } else if ( name === "ou" && !value ) {
      await this.setState({
        divisionsPool: [],
        choiceOuDiv: ""
      })
    }
    if (name === "dv") {
      await this.setState({choiceOuDiv: value})
    }
  }

  render() {
      const { orgUnitsPool, divisionsPool} = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label for="ou">Choose a Org Units</label>
          <select name="ou" 
            id="orgunits" onChange={this.handleInputChange}>
            {orgUnitsPool.map(orgUnits => (
              <option value={orgUnits._id}>{orgUnits.name}</option>
            ))}
          </select><br/>
          <label for="dv">Choose a Divisions</label>
          <select name="dv"
            id="division" onChange={this.handleInputChange}>
            {divisionsPool.map(dv => (
              <option value={dv.id}>{dv.div.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default OuDivSelecter;
