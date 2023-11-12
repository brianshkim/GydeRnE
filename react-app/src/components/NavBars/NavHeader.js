
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";
import logo from '../images/digitalgeometriclogo.svg';
import SettingsDropdown from './NavSettings';
import CreatePostButton from '../Posts/CreatePostButton';

const NavHeader = () => {

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <main className="nav-header">
      <nav className="nav-content">
        <div className="nav-items">
          <NavLink className="nav-header-logo" to="/home"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}>
            <img id="navLogo" src={logo} alt='/home' />
          </NavLink>
        </div>
        <div className="nav-items">
          <div className="nav-search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search for people, topics, streams, and more' className='text-wrapper'/>
          </div>
            
        </div>

        <div className="nav-items-right">
        {sessionUser && (
            <>
              <i class=" fa-regular fa-bell"></i>
              <div className="nav-create-post">
            <CreatePostButton/>
          </div>
          <SettingsDropdown />
          <i class=" fa-solid fa-circle-user"></i>
            </>
          )}
        {!sessionUser && (
            <>
          <SettingsDropdown />
          <i class=" fa-solid fa-circle-user"></i>
            </>
          )}  
        </div>
        
      </nav>
    </main>
  );
}

export default NavHeader;
