import React, { Component } from 'react';

class OuDivDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitsPool: [],
      divisionsPool: []
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
      response.json().then(OrgUnits => {
        let orgUnitsPool = [{_id: "", name: ""}];
        OrgUnits.forEach( ou => {
          orgUnitsPool.push(ou);
        })
        this.setState( { orgUnitsPool } );
        console.log( orgUnitsPool );
      })
    })
  }

  handleInputSubmit(event) {
    event.preventDefault();
    alert("Click Submit!");
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "ou" ) {
      fetch('/login/getdiv/' + value)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        response.json().then(divisions => {
          let divisionsPool = [];
          divisions.forEach((OuDiv) => {
            divisionsPool.push(OuDiv.divisions);
          })
          this.setState({divisionsPool});
          console.log(divisionsPool);
        })
      })
    }
    alert(" name: " + name + " value: " + value );
  }

  render() {
      const { orgUnitsPool } = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label for="ou">Choose a Org Units</label>
          <select name="ou" 
            id="orgunits" onChange={this.handleInputChange}>
            {orgUnitsPool.map(OrgUnits => (
              <option value={OrgUnits._id}>{OrgUnits.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default OuDivDisplay;
