import React, { Component } from 'react';

class DivSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divisionsPool: [],
      choiceDiv: ''
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
    this.props.onSubmit(this.state.choiceDiv);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "dv" && value ) {
      let tmpDivChoice = this.state.choiceDiv;
      if (tmpDivChoice.indexOf(value) !== -1 ){
        tmpDivChoice.push(value);
        this.setState({choiceDiv: tmpDivChoice});
      }
    }
  }

  render() {
      const { orgUnitsPool, divisionsPool} = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
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

export default DivSelecter;
