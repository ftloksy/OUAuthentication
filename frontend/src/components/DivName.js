import React, { Component } from 'react';

class DivName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        divName: ""
     };
     this.fetchNames = this.fetchNames.bind(this);
  };

  componentDidMount() {
    this.fetchNames(this.props.divid);
  }

  async fetchNames(urlEndPart) {
    fetch('/login/getdivnamebyid/' + urlEndPart)
    .then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      response.json().then(async dv => {
        await this.setState( { 
            divName: dv.name
          } );
        console.log( dv.name );
      })
    }) 
    .catch( err => {
      console.log("Error: ", err.message);
    })
  }

  render() {
      const { divName } = this.state ;
      return (
        <span>{divName}</span>
      );
  }
}

export default DivName;
