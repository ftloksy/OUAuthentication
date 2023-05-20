import React, { Component } from 'react';

class OuDivName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        divName: ""
     };
     this.fetchNames = this.fetchNames.bind(this);
  };

  componentDidMount() {
    this.fetchNames();
  }

  async fetchNames() {
    fetch('/login/getdivnamebyid/' + this.props.divid)
    .then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      response.json().then(dv => {
        this.setState( { 
            divName: dv.name
          } );
        console.log( dv.name );
      })
    })
  }

  render() {
      const { divName } = this.state ;
      return (
        <span>Division: {divName}</span>
      );
  }
}

export default OuDivName;