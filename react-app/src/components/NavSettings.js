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
                <input class="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
                <a href="#"><i class="fa-solid fa-gear"></i>Settings</a>
                <a href="#"><i class="fa-regular fa-circle-question"></i>Help</a>
                <LogoutButton />
            </div>
        </div>
    );
}

export default SettingsDropdown;