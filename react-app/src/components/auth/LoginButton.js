import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal';
import { login } from '../../store/session';
import LoginForm from './LoginForm';

const LoginButton = () => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const onlogin = async (e) => {
      await dispatch(login());
    };
  
    return (
        <>
        <button onClick={() => setShowModal(true)}
          className = 'login-button'>
          Log in
        </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
              </Modal>
            )}
      </>
    );
  };
  
  export default LoginButton;