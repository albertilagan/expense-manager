import React, { Component } from 'react';
import './Modal.scss';

export default class Modal extends Component {
  render() {
    return (
      <div className={'overlay' + (this.props && this.props.show ? ' show' : '')}>
        <div className="modal-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}