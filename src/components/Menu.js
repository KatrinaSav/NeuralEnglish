import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'


const Menu = () => {
  return (
    <nav className="navigationDiv">
      <h2 className="mainLabel">
        <span className="redLabel">Neural</span>English
      </h2>
      <div className="navPanel">
        <Link className="navLink" to={'reading'}>
          Reading
        </Link>
        <Link className="navLink" to={'testing'}>
          Testing
        </Link>
        <Link className="navLink" to={'account'}>
          Account
        </Link>
      </div>
      <div className="navIcons">
        <Link to={'settings'}>
          <FontAwesomeIcon icon={faCog} className="navIcon" />
        </Link>
        <Link to={'.'} >
          <FontAwesomeIcon icon={faSignOutAlt} className="navIcon" />
        </Link>
      </div>
    </nav>

  );
};

export default Menu;
