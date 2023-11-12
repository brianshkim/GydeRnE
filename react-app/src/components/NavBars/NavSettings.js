import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginButton from '../auth/LoginButton';
import SignupButton from '../auth/SignupButton';
import "./NavSettings.css";

const SettingsDropdown = () => {

  const sessionUser = useSelector((state) => state.session.user);

    return (
        <div class="settings-button">
            <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                <label class="for-dropdown" for="dropdown"><i class="fa-solid fa-bars"></i></label>
            <div class="section-dropdown">
              {/* Settings */}
            <li className='settings-drop-item'><NavLink to="/settings" 
              onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
              exact={true}className="navitem">
                {/* <i class="fa-solid fa-gear"></i>  */}
                Settings</NavLink></li>
             {/* Help */}
            <li className='settings-drop-item'><NavLink to="/help" 
              onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
              exact={true}className="navitem">
                {/* <i class="fa-regular fa-circle-question"></i>  */}
                Help</NavLink></li>

                {sessionUser && 
                  (<li className='settings-drop-item'><LogoutButton /></li>)}
                {!sessionUser && 
                  (<li className='settings-drop-item'><LoginButton /></li>)}
                {!sessionUser && 
                  (<li className='settings-drop-item'><SignupButton /></li>)}

            </div>
        </div>
    );
}

export default SettingsDropdown;