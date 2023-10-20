import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavSettings.css";

const SettingsDropdown = () => {
    return (
        <div class="settings-button">
            <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                <label class="for-dropdown" for="dropdown"><i class="fa-solid fa-bars"></i></label>
            <div class="section-dropdown">
            <li><NavLink to="/settings" 
              onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
              exact={true}className="navitem"><i class="fa-solid fa-gear"></i> Settings</NavLink></li>
            <li><NavLink to="/help" 
              onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
              exact={true}className="navitem"><i class="fa-regular fa-circle-question"></i> Help</NavLink></li>
                <LogoutButton />
            </div>
        </div>
    );
}

export default SettingsDropdown;