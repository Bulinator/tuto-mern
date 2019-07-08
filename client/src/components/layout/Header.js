import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                <i className="globe icon"></i>MERN
            </Link>

            <div className="right menu">
                <Link to="/" className="item">
                   <i className="code icon"></i>CODE 
                </Link>
            </div>
        </div>
    );
};

export default Header;