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
    //const { name, id, value } = event.target;
    //this.setState( { })
    //console.log(event);
    this.props.onSubmit( choiceOuDiv);
  }

  async handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "ou" && value ) {

      fetch('/login/getoudiv/' + value)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        response.json().then(async divisions => {
          let divisionsPool = [];
          divisions.forEach((ouDiv) => {
            divisionsPool.push( { id: ouDiv._id, div: ouDiv.divisions } );
          })
          await this.setState({divisionsPool});
          console.log(divisionsPool);
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
