import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.auth);

  const renderLogInOut = () => {
    // Renders header menu elements in depend on login/out state
    switch (user) {
      case null:
        return <li className='menu__item'>Loading...</li>;
      case false:
        return (
          <li className='menu__item'>
            <a href='/auth/google'>Login with Google</a>
          </li>
        );
      default:
        return (
          <>
            <li className='menu__item'>
              <NavLink to='/dashboard' exact activeClassName='-active'>
                Dashboard
              </NavLink>
            </li>
            <li className='menu__item'>
              <a href='/api/logout'>Logout</a>
            </li>
          </>
        );
    }
  };

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <span>Logo</span>
        </Link>
      </div>
      <div className='menu'>
        <ol className='menu__list'>
          <li className='menu__item'>
            <NavLink to='/' exact activeClassName='-active'>
              Home
            </NavLink>
          </li>
          <li className='menu__item'>
            <NavLink to='/about' exact activeClassName='-active'>
              About
            </NavLink>
          </li>
          <li className='menu__item'>
            <NavLink to='/contact' exact activeClassName='-active'>
              Contact
            </NavLink>
          </li>
          {renderLogInOut()}
        </ol>
      </div>
    </div>
  );
};

export default Header;
