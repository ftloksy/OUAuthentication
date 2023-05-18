/**
 * This is a components. It is a button and User click
 * this button will stroage the random value to local Stroage.  
 */ 

import React, { Component } from 'react';

class LocalStorageButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomValue: 0
        };
        this.makeRandomNumber = this.makeRandomNumber.bind(this);
    };

    componentDidMount() {
        const token = localStorage.getItem('randomValue');
        if ( token ) {
            this.setState({ randomValue: token })
        } else {
            this.makeRandomNumber();
        }
    }

    makeRandomNumber() {
        const randomValue = Math.floor(Math.random() * 1000) + 1;
        this.setState({ randomValue });
        localStorage.setItem('randomValue', randomValue);
    }

    render() {
        const { randomValue } = this.state ;

        return (
            <div>
                <h1>{randomValue}</h1>
                <button onClick={this.makeRandomNumber}>Reset the Number.</button>
            </div>
        )
    }
  
}

export default LocalStorageButton;
