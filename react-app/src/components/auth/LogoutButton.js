import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className="logout-button" onClick={onLogout}
  >
    {/* <i class="fa-solid fa-arrow-right-from-bracket"></i> */}
    Logout</button>;
};

export default LogoutButton;
