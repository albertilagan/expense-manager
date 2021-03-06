import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg mb-5">
      <div className="container">
        <a className="navbar-brand" href="#">Expense Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-lg-auto">
            <li className="nav-item">
              <NavLink to="/expenses" activeClassName="active" className="nav-link">Expenses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" activeClassName="active" className="nav-link">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/report" activeClassName="active" className="nav-link">Report</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;