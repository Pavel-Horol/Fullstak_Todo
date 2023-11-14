import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './Navbar.scss';
import { Link } from 'react-router-dom';
const Navbar = () => {

  const {logout, isLogin} = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <Link to="/" className="brand-logo left">
          MERN Todo-App
        </Link>
        { isLogin 
        ? <ul id="nav-mobile" className="right">
            <li>
              <Link to="/login" onClick={logout}>
                Вийти
              </Link>
            </li>
          </ul> 
        : <ul id="nav-mobile" className="right">
          <li>
            <Link to="/login">
              Вхід
            </Link>
          </li>
        </ul> 
        
        }
      </div>
    </nav>
  );
};

export default Navbar;
