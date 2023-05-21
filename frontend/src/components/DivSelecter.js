import React, { Component } from 'react';
import DivName from './DivName';

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
    const token = localStorage.getItem('token');
    if ( token ) {
      console.log("Storaged Token: ", token);

      fetch('/login/getadmindiv', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        }
        response.json().then( divs => {
          let divisionsPool = [""];
          divs.forEach( dv => {
            divisionsPool.push(dv);
          })
          this.setState( { divisionsPool: divisionsPool } );
          console.log( divisionsPool );
        })
      })

    } else {
      console.log("Don't has any record.");
    }
  }

  handleInputSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.choiceDiv);
    console.log(this.state.choiceDiv);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "dv" && value ) {
      this.setState({choiceDiv: value});
    }
  }

  render() {
      const { divisionsPool } = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label for="dv">Choose a Divisions</label>
          <select name="dv"
            id="division" onChange={this.handleInputChange}>
            {divisionsPool.map(dv => (
              <option value={dv}><DivName divid={dv} /></option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default DivSelecter;
