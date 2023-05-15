import React, { Component } from 'react';

class OuDivDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ouObjs: []
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
        let ouObjs = [{_id: "", name: ""}];
        OrgUnits.forEach( ou => {
          ouObjs.push(ou);
        })
        this.setState( { ouObjs } );
        console.log(OrgUnits);
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
    alert(" name: " + name + " value: " + value );
  }

  render() {
      const { ouObjs } = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label for="ou">Choose a Org Units</label>
          <select name="ou" 
            id="orgunits" onChange={this.handleInputChange}>
            {ouObjs.map(OrgUnits => (
              <option value={OrgUnits._id}>{OrgUnits.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default OuDivDisplay;
