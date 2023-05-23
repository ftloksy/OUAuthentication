import React, { Component } from 'react';
import DivName from './DivName';
import FetchDivisons from '../lib/FetchDivisions';

/**
 * It is responsible for rendering a form 
 * with a select dropdown menu to choose a division from a list.
 */
class DivSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divisionsPool: [],
      choiceDiv: ''
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    
    this.divsPool = new FetchDivisons();
  };

  componentDidMount() {
    this.fetchDiv();
  }

  async fetchDiv() {
    
    // fetch all Divisions record at database.
    const divs = await this.divsPool.fetch();

    let divisionsPool = [""];
    divs.forEach( dv => {
      divisionsPool.push(dv);
    })
    this.setState( { divisionsPool } );
  }

  /**
   * When web client click submit button.
   * will pass the client choice to parent components.
   */ 
  handleInputSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.choiceDiv);
    console.log(this.state.choiceDiv);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
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
              <option value={dv._id}><DivName divid={dv._id} /></option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default DivSelecter;
