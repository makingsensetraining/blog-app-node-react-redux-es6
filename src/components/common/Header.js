import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <IndexLink to="/" activeClassName="navbar-brand" className="navbar-brand"><i className="glyphicon glyphicon-check" /> MKS Blog</IndexLink>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <IndexLink to="/" activeClassName="active"><i className="glyphicon glyphicon-home"/> Home</IndexLink>
                    </li>
                    <li>
                        <Link to="/about" activeClassName="active"><i className="glyphicon glyphicon-exclamation-sign"/> About</Link>
                    </li>
                </ul>
                <div className="navbar-right">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#"><i className="glyphicon glyphicon-user"></i> Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    //
};

export default Header;
