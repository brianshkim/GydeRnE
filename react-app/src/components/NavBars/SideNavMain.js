
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./SideNavMain.css";

const SideNavMain = () => {

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <div className="sidenav-items">
                    <ul>
                        <li className="sidenavitem"><NavLink to="/courses"
                            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                            exact={true} >
                            <i class="fa-solid fa-graduation-cap"></i> My Courses
                        </NavLink>
                        </li>

                        <li className="sidenavitem"><NavLink to="/research"
                            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                            exact={true} >
                            <i className="fa-regular fa-lightbulb"></i> Research
                        </NavLink>
                        </li>

                        <li className="sidenavitem"><NavLink to="/journals"
                            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                            exact={true} >
                            <i className="fa-solid fa-book"></i> Journals
                        </NavLink>
                        </li>

                        <li className="sidenavitem"><NavLink to="/forum"
                            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                            exact={true} >
                            <i className="fa-regular fa-message"></i> Forum
                        </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default SideNavMain;