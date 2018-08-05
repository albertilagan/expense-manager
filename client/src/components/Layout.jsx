import React, { Component } from 'react'
import Header from './Header/Header';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
      </React.Fragment>
    )
  }
}
