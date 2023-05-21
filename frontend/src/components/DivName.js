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
    // if ( this.props.divid ) {
      fetch('/login/getdivnamebyid/' + this.props.divid)
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
    // } else {
    //   await this.setState ( {
    //     divName: "unknown"
    //   });
    // }
  }

  render() {
      const { divName } = this.state ;
      return (
        <span>Division: {divName}</span>
      );
  }
}

export default OuDivName;
