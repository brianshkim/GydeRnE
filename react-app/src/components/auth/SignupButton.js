import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal';
import { signUp } from '../../store/session';
import SignupForm from './SignupForm';

const SignupButton = () => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const onsignUp = async (e) => {
      await dispatch(signUp());
    };

    return (
        <>
        <button onClick={() => setShowModal(true)}
          className='signup-button'>
          Sign Up
        </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <SignupForm />
              </Modal>
            )}
      </>
    );
  };

  export default SignupButton;
